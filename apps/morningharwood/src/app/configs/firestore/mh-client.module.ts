import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { MhClientFirestore } from './mh-client';


@NgModule({
  imports: [
    AngularFirestoreModule,
    AngularFireModule.initializeApp(MhClientFirestore.config()),
  ],
})
export class MhFirestoreClientModule {
}
