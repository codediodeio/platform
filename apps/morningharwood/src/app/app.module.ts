import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NxModule } from '@nrwl/nx';
import { AppComponent } from './app.component';
import { MhFirestoreClientModule } from './firestore/mh-client.module';
import { MorningHarwoodRouterModule } from './router/router.module';
import { AngularFireAuthModule } from 'angularfire2/auth';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    BrowserModule.withServerTransition({ appId: 'morningharwood-ssr' }),
    NxModule.forRoot(),
    MhFirestoreClientModule.forRoot(),
    AngularFireAuthModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    MorningHarwoodRouterModule,
  ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ],
})
export class AppModule {
}
