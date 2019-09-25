import { Component, OnInit } from '@angular/core';
import {EgressIncomeService} from '../egress-income/egress-income.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  constructor(public egressIncomeService: EgressIncomeService) { }

  ngOnInit() {
    this.egressIncomeService.initEgressIcomeListener();
  }

}
