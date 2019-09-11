import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase/app';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private router: Router) {
  }

  createUser(name: string, email: string, password: string) {
     this.afAuth.auth.createUserWithEmailAndPassword(email, password)
       .then(resp => {
         console.log(resp);
         this.router.navigate(['/']);
       })
       .catch( error => {
         console.error(error);
       });
  }
}
