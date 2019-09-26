import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppState} from '../../app.reducer';
import {Store} from '@ngrx/store';
import {EgressIncome} from '../egress-income.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: []
})
export class DetailComponent implements OnInit, OnDestroy {
items: EgressIncome[];
egressIncomeListSubscription: Subscription = new Subscription();
  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
  this.egressIncomeListSubscription =  this.store.select('egressIncome')
      .subscribe(egressIncome => {
        this.items = egressIncome.items ;
        console.log(this.items);
      });
  }
  ngOnDestroy(): void {
    this.egressIncomeListSubscription.unsubscribe();
  }
  deleteItem(uid: string) {
    console.log('Deleting the uid: ',uid);
  }


}
