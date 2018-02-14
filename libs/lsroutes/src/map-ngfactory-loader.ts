import {
  Compiler,
  Inject,
  Injectable,
  InjectionToken,
  NgModuleFactory,
  NgModuleFactoryLoader,
  Type
} from '@angular/core';

/**
 * A map key'd by loadChildren strings and Modules or NgModuleFactories as
 * vaules
 */
export interface IModuleMap {
  [key: string]: Type<any> | NgModuleFactory<any>;
}

/**
 * Token used by the ModuleMapNgFactoryLoader to load modules
 */
export const MODULE_MAP: InjectionToken<IModuleMap> = new InjectionToken('MODULE_MAP');

/**
 * NgModuleFactoryLoader which does not lazy load
 */
@Injectable()
export class ModuleMapNgFactoryLoader implements NgModuleFactoryLoader {
  constructor(private compiler: Compiler, @Inject(MODULE_MAP) private moduleMap: IModuleMap) {}

  public load(loadChildrenString: string): Promise<NgModuleFactory<any>> {
    const offlineMode = this.compiler instanceof Compiler;
    const type = this.moduleMap[loadChildrenString];

    if (!type) {
      throw new Error(`${loadChildrenString} did not exist in the MODULE_MAP`);
    }

    return offlineMode ? this.loadFactory(type as NgModuleFactory<any>) : this.loadAndCompile(type as Type<any>);
  }

  private loadFactory(factory: NgModuleFactory<any>): Promise<NgModuleFactory<any>> {
    return new Promise(resolve => resolve(factory));
  }

  private loadAndCompile(type: Type<any>): Promise<NgModuleFactory<any>> {
    return this.compiler.compileModuleAsync(type);
  }
}
