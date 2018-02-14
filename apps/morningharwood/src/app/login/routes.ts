import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginContainerMasterComponent } from './container/master/component';

export const config: Routes = [
  {
    path: 'login',
    children: [
      {
        path: '',
        component: LoginContainerMasterComponent
      }
    ]
  }
];

export const routes: ModuleWithProviders = RouterModule.forChild(config);
