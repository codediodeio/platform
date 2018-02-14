import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AdminGuard } from './admin.guard';
import { AuthService } from './auth.service';


@NgModule({
  imports: [ CommonModule ],
})
export class CoreModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        AuthService,
        AdminGuard,
      ],
    };
  }
}
