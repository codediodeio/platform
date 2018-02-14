import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '@suite/core';
import { AdminContainerMasterComponent } from './container/master/component';


export const config: Routes = [
  {
    path: 'admin',
    canActivate: [ AdminGuard ],
    children: [
      {
        path: '',
        component: AdminContainerMasterComponent,
      },
    ],
  },
];

export const routes: ModuleWithProviders = RouterModule.forChild(config);
