import {Component, OnDestroy, OnInit} from '@angular/core';
import * as fromEgressIncome from '../../egress-income/egress-income.reducer';
import {Store} from '@ngrx/store';
import {EgressIncome} from '../egress-income.model';
import {Subscription} from 'rxjs';
import {EgressIncomeService} from '../egress-income.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: []
})
export class DetailComponent implements OnInit, OnDestroy {
  items: EgressIncome[];
  egressIncomeListSubscription: Subscription = new Subscription();

  constructor(private store: Store<fromEgressIncome.AppState>,
              public egressIncomeService: EgressIncomeService) {
  }

  ngOnInit() {
    this.egressIncomeListSubscription = this.store.select('egressIncome')
      .subscribe(egressIncome => {
        this.items = egressIncome.items;
      });
  }

  ngOnDestroy(): void {
    this.egressIncomeListSubscription.unsubscribe();
  }

  deleteItem(item: EgressIncome) {
    this.egressIncomeService.deleteEgressIncome(item.uid)
      .then(() => {
      Swal.fire('Item deleted', item.description, 'success');
    });

  }
}
