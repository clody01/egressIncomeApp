import {Routes} from '@angular/router';
import {StatisticComponent} from '../egress-income/statistic/statistic.component';
import {EgressIncomeComponent} from '../egress-income/egress-income.component';
import {DetailComponent} from '../egress-income/detail/detail.component';



export const dashboardRoutes: Routes = [
  {path: '', component: StatisticComponent},
  {path: 'egress-income', component: EgressIncomeComponent},
  {path: 'detail', component: DetailComponent},
];
