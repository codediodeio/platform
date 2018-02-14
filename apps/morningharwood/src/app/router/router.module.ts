import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AdminRouteModule } from '../admin/admin.module';
import { LoginRouteModule } from '../login/login.module';
import { StoreNavigateService } from './service';


@NgModule({
  imports: [
    CommonModule,
    AdminRouteModule,
    LoginRouteModule,
  ],
  declarations: [],
})
export class MorningHarwoodRouterModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: MorningHarwoodRouterModule,
      providers: [ StoreNavigateService ],
    };
  }
}
