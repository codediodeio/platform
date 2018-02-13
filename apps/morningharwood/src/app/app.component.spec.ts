import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FirebaseFirestore } from '@firebase/firestore-types';
import { FirebaseApp } from 'angularfire2';
import {
  AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument,
  QueryFn,
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { AppComponent } from './app.component';


class FirebaseMock implements AngularFirestore {
  app: FirebaseApp;
  firestore: FirebaseFirestore;
  persistenceEnabled$: Observable<boolean>;

  collection<T>(path: string, queryFn?: QueryFn): any {
    return {
      valueChanges: () => ''
    }
  }

  doc<T>(path: string): AngularFirestoreDocument<T> {
    return undefined;
  }

  createId(): string {
    return undefined;
  }

  private valueChanges() {
    return Observable.of(true);
  }
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
        ],
        declarations: [ AppComponent ],
        providers: [
          {
            provide: AngularFirestore,
            useClass: FirebaseMock,
          },
        ],
      }).compileComponents();
    }),
    // spyOn(FirebaseMock, 'collection')
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
