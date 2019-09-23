import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {EgressIncome} from './egress-income.model';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EgressIncomeService {

  constructor(private afDB: AngularFirestore, public authService: AuthService) {
  }

  createEgressIncome(esgressIncome: EgressIncome) {
    const user = this.authService.getUser();
    return this.afDB.doc(`${user.uid}/egress-income`)
      .collection('items').add({...esgressIncome});
  }

}
