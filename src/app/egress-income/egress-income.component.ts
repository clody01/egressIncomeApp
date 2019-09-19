import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EgressIncome} from './egress-income.model';

@Component({
  selector: 'app-egress-income',
  templateUrl: './egress-income.component.html',
  styles: []
})
export class EgressIncomeComponent implements OnInit {
  egressIncomeForm: FormGroup;
  type = 'income';

  constructor() {
  }

  ngOnInit() {
    this.egressIncomeForm = new FormGroup({
      description: new FormControl('', Validators.required),
      amount: new FormControl(0, Validators.min(0))
    });
  }

  createEgressIncome() {
    const egressIncome = new EgressIncome({...this.egressIncomeForm.value, type: this.type});
    console.log('egressIncome =>', egressIncome);
  }
}
