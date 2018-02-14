import { Routes } from '@angular/router';

export const config: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'menu'
  },
  {
    path: 'admin',
    loadChildren: './admin/module#AdminRouteModule'
  },
  {
    path: 'login',
    loadChildren: './login/module#LoginRouteModule'
  }
  // {
  //   path: '**',
  //   component: ErrorMasterComponent,
  // },
];

export enum RoutesName {
  PROFILE = 'profile',
  MENU = 'menu',
  WORK = 'work',
  LOGIN = 'login',
  ADMIN = 'admin'
}
