import { ModuleWithProviders, NgModule, NgModuleFactoryLoader, Provider } from '@angular/core';
import { IModuleMap, ModuleMapNgFactoryLoader, MODULE_MAP } from './map-ngfactory-loader';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
/**
 * Helper function for getting the providers object for the MODULE_MAP
 *
 * @param {ModuleMap} moduleMap Map to use as a value for MODULE_MAP
 */
export function provideModuleMap(moduleMap: IModuleMap): Provider {
  return {
    provide: MODULE_MAP,
    useValue: moduleMap
  };
}

/**
 * Module for using a NgModuleFactoryLoader which does not lazy load
 */
@NgModule({
  providers: [
    {
      provide: NgModuleFactoryLoader,
      useClass: ModuleMapNgFactoryLoader
    }
  ]
})
export class MapLoaderModule {
  /**
   * Returns a ModuleMapLoaderModule along with a MODULE_MAP
   *
   * @param {ModuleMap} moduleMap Map to use as a value for MODULE_MAP
   */
  public static withMap(moduleMap: IModuleMap): ModuleWithProviders {
    return {
      ngModule: MapLoaderModule,
      providers: [
        {
          provide: MODULE_MAP,
          useValue: moduleMap
        }
      ]
    };
  }
}
