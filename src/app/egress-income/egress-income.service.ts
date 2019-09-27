import {Injectable, OnDestroy} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {EgressIncome} from './egress-income.model';
import {AuthService} from '../auth/auth.service';
import {AppState} from '../app.reducer';
import {Store} from '@ngrx/store';
import {filter, map} from 'rxjs/operators';
import {SetItemsAction, UnSetItemsAction} from './egress-income.actions';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EgressIncomeService {
  egressIncomeListSubscription: Subscription = new Subscription();
  egressIncomeItemsSubscription: Subscription = new Subscription();

  constructor(private afDB: AngularFirestore,
              public authService: AuthService,
              private store: Store<AppState>) {
  }

  deleteSubscriptions() {
    this.egressIncomeItemsSubscription.unsubscribe();
    this.egressIncomeListSubscription.unsubscribe();
    this.store.dispatch(new UnSetItemsAction());
  }

  initEgressIncomeListener() {
    this.egressIncomeListSubscription = this.store.select('auth')
    //    .pipe( filter( auth => auth.user != null ))
      .subscribe(auth => {
        if (auth.user != null) {
          this.egressIncomeItems(auth.user.uid);
        }
      });
  }

  private egressIncomeItems(uid: string) {
    this.egressIncomeItemsSubscription = this.afDB.collection(`${uid}/egress-income/items`)
      .snapshotChanges()
      .pipe(map(docData => {
        return docData.map(doc => {
          return {...doc.payload.doc.data(), uid: doc.payload.doc.id};
        });
      }))
      .subscribe((collection: any []) => {
        this.store.dispatch(new SetItemsAction(collection));
      });
  }

  createEgressIncome(egressIncome: EgressIncome) {
    const user = this.authService.getUser();
    return this.afDB.doc(`${user.uid}/egress-income`)
      .collection('items').add({...egressIncome});
  }

  deleteEgressIncome(uid: string) {
    const user = this.authService.getUser();
    return this.afDB.doc(`${user.uid}/egress-income/items/${uid}`)
      .delete();
  }

}
