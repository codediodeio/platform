import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '@suite/core';
import { AdminContainerMasterComponent } from './container/master/component';
import { routes as adminRoutes } from './routes';


export const EXPORTS_DECLARATIONS = [ AdminContainerMasterComponent ];

@NgModule({
  imports: [
    CommonModule,
    adminRoutes,
    CoreModule.forRoot(),
  ],
  declarations: [ ...EXPORTS_DECLARATIONS ],
  exports: [ ...EXPORTS_DECLARATIONS ],
})
export class AdminRouteModule {
}
