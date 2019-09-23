import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EgressIncome} from './egress-income.model';
import {EgressIncomeService} from './egress-income.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-egress-income',
  templateUrl: './egress-income.component.html',
  styles: []
})
export class EgressIncomeComponent implements OnInit {
  egressIncomeForm: FormGroup;
  type = 'income';

  constructor(public egressIncomeService: EgressIncomeService) {
  }

  ngOnInit() {
    this.egressIncomeForm = new FormGroup({
      description: new FormControl('', Validators.required),
      amount: new FormControl(0, Validators.min(0))
    });
  }

  createEgressIncome() {
    const egressIncome = new EgressIncome({...this.egressIncomeForm.value, type: this.type});
    this.egressIncomeService.createEgressIncome(egressIncome)
      .then(() => {
        Swal.fire('Created', egressIncome.description, 'success');
        this.egressIncomeForm.reset({amount: 0});
      });

    // console.log('egressIncome =>', egressIncome);
  }
}
