import {Injectable, OnDestroy} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase/app';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import * as fireBase from 'firebase';
import {map} from 'rxjs/operators';
import {User} from './user.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {Store} from '@ngrx/store';
import {AppState} from '../app.reducer';
import {ActivateLoadingAction, DeactivateLoadingAction} from '../shared/ui.actions';
import {SetUserAction} from './auth.action';
import {Subscription} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authenticationSubscription: Subscription = new Subscription();

  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private afDB: AngularFirestore,
              private store: Store<AppState>) {
  }


  initAuthListener() {
    this.afAuth.authState.subscribe((fbUser): fireBase.User => {
      if (fbUser) {
        this.authenticationSubscription = this.afDB.doc(`${fbUser.uid}/user`).valueChanges()
          .subscribe((userObject: any) => {
            const authenticatedUser = new User(userObject);
            this.store.dispatch(new SetUserAction(authenticatedUser));
          });
      } else {
        this.authenticationSubscription.unsubscribe();
      }

      // console.log(fbUser);
      return fbUser;
    });
  }

  createUser(userName: string, email: string, password: string) {

    this.store.dispatch(new ActivateLoadingAction());
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(resp => {

        const user: User = {
          uid: resp.user.uid,
          name: userName,
          email: resp.user.email
        };
        // console.log(resp);

        this.afDB.doc(`${user.uid}/user`)
          .set(user)
          .then(() => {
            this.router.navigate(['/']);
            this.store.dispatch(new DeactivateLoadingAction());
          });
      })
      .catch(error => {
        this.store.dispatch(new DeactivateLoadingAction());
        Swal.fire('Login error', error.message, 'error');
        // console.error(error);
      });
  }

  login(email: string, password: string) {
    this.store.dispatch(new ActivateLoadingAction());
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(resp => {
        // console.log(resp);
        this.router.navigate(['/']);
        this.store.dispatch(new DeactivateLoadingAction());
      })
      .catch(error => {
        // console.error(error);
        this.store.dispatch(new DeactivateLoadingAction());
        Swal.fire('Login error', error.message, 'error');
        // this.router.navigate(['/login']);
      });
  }

  logout() {
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();
  }

  isAuth() {
    return this.afAuth.authState
      .pipe(
        map(fbUser => {
          if (fbUser == null) {
            this.router.navigate(['/login']);
          }
          return fbUser != null;
        })
      );
  }
}
