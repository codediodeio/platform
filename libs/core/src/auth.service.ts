import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import { User } from './user.interface';


@Injectable()
export class AuthService {
  public user$: Observable<User>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
    this.onInit();
  }

  public onInit(): void {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if(user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return Observable.of(null);
        }
      }),
    );
  }

  public googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  public googleLogout() {
    return this.afAuth.auth.signOut();
  }

  private async oAuthLogin(provider) {
    const credentials = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credentials.user);
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      roles: {
        subscriber: true,
      },
    };

    return userRef.set(data, { merge: true });
  }

  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if(!user) {
      return false;
    }
    return allowedRoles.some(role => user.roles[ role ]);
  }

  // TODO Lock down Auth from serverside.
  // https://angularfirebase.com/lessons/role-based-authorization-with-firestore-nosql-and-angular-5/
  // @ 5:00mins
  public canRead(user: User): boolean {
    const allowed = [
      'admin',
      'editor',
      'subscriber',
    ];
    return this.checkAuthorization(user, allowed);
  }

  public canEdit(user: User): boolean {
    const allowed = [
      'admin',
      'editor',
    ];
    return this.checkAuthorization(user, allowed);
  }

  public canDelete(user: User): boolean {
    const allowed = [ 'admin' ];
    return this.checkAuthorization(user, allowed);
  }
}
