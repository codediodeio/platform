import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminRouteModule } from '../admin/admin.module';
import { LoginRouteModule } from '../login/module';


@NgModule({
  imports: [
    CommonModule,
    AdminRouteModule,
    LoginRouteModule,
  ],
  declarations: [],
})
export class MorningHarwoodRouterModule {
}
