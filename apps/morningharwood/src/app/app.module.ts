import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NxModule } from '@nrwl/nx';
import { AppComponent } from './app.component';
import { MhFirestoreClientModule } from './firestore/mh-client.module';



@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    BrowserModule.withServerTransition({ appId: 'morningharwood-ssr' }),
    NxModule.forRoot(),
    MhFirestoreClientModule.forRoot(),
    RouterModule.forRoot(
      [],
      { initialNavigation: 'enabled' },
    ),
  ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ],
})
export class AppModule {
}
