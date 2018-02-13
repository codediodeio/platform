import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NxModule } from '@nrwl/nx';

import { AppComponent } from './app.component';
import { MhFirestoreClientModule } from './firestore/mh-client.module';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
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
