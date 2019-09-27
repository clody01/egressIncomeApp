import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducer';
import {Subscription} from 'rxjs';
import {EgressIncome} from '../egress-income.model';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styles: []
})
export class StatisticComponent implements OnInit {
  incomes: number;
  expenses: number;
  howManyExpenses: number;
  howManyIncomes: number;
  statisticsSubscription: Subscription = new Subscription();

  constructor(private  store: Store<AppState>) {
  }

  ngOnInit() {
    this.statisticsSubscription = this.store.select('egressIncome').subscribe(egressIncome => {
      this.countIncome(egressIncome.items);
    });
  }

  countIncome(items: EgressIncome[]) {
    this.incomes = 0;
    this.expenses = 0;
    this.howManyExpenses = 0;
    this.howManyIncomes = 0;
    items.forEach(item => {
      if (item.type === 'income') {
        this.howManyIncomes++;
        this.incomes += item.amount;
      } else {
        this.howManyExpenses++;
        this.expenses += item.amount;
      }
    });
  }
}
