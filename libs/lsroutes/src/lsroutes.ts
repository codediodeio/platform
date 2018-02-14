import { Injector, NgModuleFactory, NgModuleFactoryLoader, NgZone, ReflectiveInjector } from '@angular/core';
import { platformServer } from '@angular/platform-server';
import { Route, ROUTES } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'zone.js/dist/zone-node';
import { provideModuleMap } from './map-loader.module';

let loader: NgModuleFactoryLoader;

export function lsRoutes<T>(
  returnType: 'flatPaths' | 'nestedPaths' | 'full',
  serverFactory: NgModuleFactory<T>,
  lazyModuleMap?: any
) {
  const ngZone = new NgZone({ enableLongStackTrace: false });
  const rootInjector = ReflectiveInjector.resolveAndCreate(
    [
      {
        provide: NgZone,
        useValue: ngZone
      },
      provideModuleMap(lazyModuleMap)
    ],
    platformServer().injector
  );
  const moduleRef = serverFactory.create(rootInjector);
  loader = moduleRef.injector.get(NgModuleFactoryLoader);
  return Promise.all(createModule(serverFactory, rootInjector)).then(routes => {
    if (returnType === 'full') {
      return routes;
    }
    if (returnType === 'nestedPaths') {
      return flattenRouteToPath(routes);
    }
    if (returnType === 'flatPaths') {
      return flattenArray(flattenRouteToPath(routes));
    }
    throw new Error('you must provide a supported returnType');
  });
}

function flattenArray<T, V>(array: T[] | T): V[] {
  return !Array.isArray(array) ? array : [].concat.apply([], array.map(r => flattenArray(r)));
}

function flattenRouteToPath(routes: Route[]): Array<string[] | string> {
  return routes.map(route => {
    if (!route.children) {
      return route.path ? '/' + route.path : '/';
    } else {
      // extra flatten here for nested routes.
      return flattenArray(flattenRouteToPath(route.children)).map(
        (childRoute: string) => (!route.path ? '' : '/' + route.path) + childRoute
      );
    }
  });
}

function coerceIntoPromise<T>(mightBePromise: Observable<T> | Promise<T> | T): Promise<T> {
  if (mightBePromise instanceof Observable) {
    return mightBePromise.toPromise();
  }
  return Promise.resolve(mightBePromise);
}

function extractRoute(route: Route, injector: Injector): Promise<Route> {
  if (route.loadChildren) {
    return resolveLazyChildren(route, injector);
  }
  if (route.children) {
    return Promise.all(route.children.map(r => extractRoute(r, injector))).then(routes => {
      route.children = routes;
      return route;
    });
  }
  return Promise.resolve(route);
}

function resolveLazyChildren(route: Route, injector: Injector): Promise<Route> {
  let nextFactory: Promise<NgModuleFactory<any>>;
  if (typeof route.loadChildren === 'function') {
    nextFactory = coerceIntoPromise<NgModuleFactory<any>>(route.loadChildren() as
      | NgModuleFactory<any>
      | Promise<NgModuleFactory<any>>);
  } else {
    nextFactory = loader.load(route.loadChildren as string);
  }
  return nextFactory.then(factory => Promise.all(createModule(factory, injector))).then(children => {
    route.children = children;
    delete route.loadChildren;
    return route;
  });
}

function createModule<T>(factory: NgModuleFactory<T>, parentInjector: Injector): Array<Promise<Route>> {
  const moduleRef = factory.create(parentInjector);
  const routes = moduleRef.injector.get(ROUTES);

  return flattenArray<Route[][], Route>(routes).map(route => {
    if (!route.loadChildren) {
      // no lazy loaded paths so we can return the routes directly.
      return extractRoute(route, parentInjector);
    } else {
      return resolveLazyChildren(route, moduleRef.injector);
    }
  });
}
