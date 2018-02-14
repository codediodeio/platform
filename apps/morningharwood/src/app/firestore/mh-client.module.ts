import { ModuleWithProviders, NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { MhClientFirestore } from './config/mh-client';
import { HigherOrderFirestoreService } from './services/ho-firestore.service';

@NgModule({
  imports: [AngularFirestoreModule, AngularFireModule.initializeApp(MhClientFirestore.config())]
})
export class MhFirestoreClientModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MhFirestoreClientModule,
      providers: [HigherOrderFirestoreService]
    };
  }
}
