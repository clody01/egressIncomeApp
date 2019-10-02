import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EgressIncome} from './egress-income.model';
import {EgressIncomeService} from './egress-income.service';
import Swal from 'sweetalert2';
import {Store} from '@ngrx/store';
import * as fromEgressIncome from '../egress-income/egress-income.reducer';
import {Subscription} from 'rxjs';
import {ActivateLoadingAction, DeactivateLoadingAction} from '../shared/ui.actions';

@Component({
  selector: 'app-egress-income',
  templateUrl: './egress-income.component.html',
  styles: []
})
export class EgressIncomeComponent implements OnInit, OnDestroy {
  egressIncomeForm: FormGroup;
  type = 'income';
  loadingSubscription: Subscription = new Subscription();
  loading: boolean;

  constructor(public egressIncomeService: EgressIncomeService, private store: Store<fromEgressIncome.AppState>) {
  }

  ngOnInit() {
    this.loadingSubscription = this.store.select('ui')
      .subscribe(ui => this.loading = ui.isLoading);
    this.egressIncomeForm = new FormGroup({
      description: new FormControl('', Validators.required),
      amount: new FormControl(0, Validators.min(0))
    });
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }

  createEgressIncome() {
    this.store.dispatch(new ActivateLoadingAction());
    const egressIncome = new EgressIncome({...this.egressIncomeForm.value, type: this.type});
    this.egressIncomeService.createEgressIncome(egressIncome)
      .then(() => {
        this.store.dispatch(new DeactivateLoadingAction());
        Swal.fire('Created', egressIncome.description, 'success');
        this.egressIncomeForm.reset({amount: 0});
        this.type = 'income';
      });
    // console.log('egressIncome =>', egressIncome);
  }


}
