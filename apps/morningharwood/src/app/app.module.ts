import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NxModule } from '@nrwl/nx';
import { RouterModule } from '@angular/router';
import { aclRoleRoutes } from '@suite/acl-role';


@NgModule({
  imports: [
    BrowserModule,
    NxModule.forRoot(),
    RouterModule.forRoot([
      {
        path: 'acl-role',
        children: aclRoleRoutes,
      },
    ], { initialNavigation: 'enabled' }),
  ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ],
})
export class AppModule {
}
