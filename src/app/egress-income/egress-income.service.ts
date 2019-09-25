import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {EgressIncome} from './egress-income.model';
import {AuthService} from '../auth/auth.service';
import {AppState} from '../app.reducer';
import {Store} from '@ngrx/store';
import {filter} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EgressIncomeService {

  constructor(private afDB: AngularFirestore,
              public authService: AuthService,
              private store: Store<AppState>) {
  }

  initEgressIcomeListener() {
    this.store.select('auth')
    //    .pipe( filter( auth => auth.user != null ))
      .subscribe(auth => {
        if (auth.user != null) {
          this.egressIcomeItems(auth.user.uid);
        }
      });
  }

  private egressIcomeItems(uid: string) {
    this.afDB.collection(`${uid}/egress-income/items`)
      .valueChanges()
      .subscribe(docData => {
        console.log(docData);
      });
  }

  createEgressIncome(egressIncome: EgressIncome) {
    const user = this.authService.getUser();
    return this.afDB.doc(`${user.uid}/egress-income`)
      .collection('items').add({...egressIncome});
  }

}
