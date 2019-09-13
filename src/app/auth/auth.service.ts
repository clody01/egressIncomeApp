import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase/app';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import * as fireBase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private router: Router) {
  }

  initAuthListener() {
    this.afAuth.authState.subscribe((fbUser): fireBase.User => {
      console.log(fbUser);
    });
  }

  createUser(name: string, email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(resp => {
        // console.log(resp);
        this.router.navigate(['/']);
      })
      .catch(error => {
        Swal.fire('Login error', error.message, 'error');
        // console.error(error);
      });
  }

  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(resp => {
        // console.log(resp);
        this.router.navigate(['/']);
      })
      .catch(error => {
        // console.error(error);
        Swal.fire('Login error', error.message, 'error');
        // this.router.navigate(['/login']);
      });
  }

  logout() {
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();
  }
}
