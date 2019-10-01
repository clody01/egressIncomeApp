import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {dashboardRoutes} from './dashboard.routes';
import {AuthGardService} from '../auth/auth-gard.service';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: dashboardRoutes,
   //  canActivate: [AuthGardService]
  },
];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule { }
