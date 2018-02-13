import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NxModule } from '@nrwl/nx';
import { aclRoleRoutes } from '@suite/acl-role';
import { AppComponent } from './app.component';
import { MhFirestoreClientModule } from './configs/firestore/mh-client.module';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { MhClientFirestore } from './configs/firestore/mh-client';


@NgModule({
  imports: [
    CommonModule,

    BrowserModule,
    NxModule.forRoot(),
    MhFirestoreClientModule,
    RouterModule.forRoot(
      [
        {
          path: 'acl-role',
          children: aclRoleRoutes,
        },
      ],
      { initialNavigation: 'enabled' },
    ),
  ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ],
})
export class AppModule {
}
