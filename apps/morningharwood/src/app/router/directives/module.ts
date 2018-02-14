import { NgModule } from '@angular/core';
import { NavigateDirective } from './go.directive';

export const EXPORTS_DECLARATIONS = [NavigateDirective];

@NgModule({
  imports: [],
  exports: [...EXPORTS_DECLARATIONS],
  declarations: [...EXPORTS_DECLARATIONS]
})
export class RouterComponentModule {}
