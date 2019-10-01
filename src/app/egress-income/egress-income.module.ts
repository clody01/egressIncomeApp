import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {EgressIncomeComponent} from './egress-income.component';
import {StatisticComponent} from './statistic/statistic.component';
import {DetailComponent} from './detail/detail.component';
import {OrderEgressIncomePipe} from './order-egress-income.pipe';
import {ChartsModule} from 'ng2-charts';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {DashboardRoutingModule} from '../dashboard/dashboard-routing.module';


@NgModule({
  declarations: [
    DashboardComponent,
    EgressIncomeComponent,
    StatisticComponent,
    DetailComponent,
    OrderEgressIncomePipe,
  ],
  imports: [
    CommonModule,
    ChartsModule,
    ReactiveFormsModule,
    SharedModule,
    DashboardRoutingModule
  ]
})
export class EgressIncomeModule {
}
