import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducer';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {EgressIncomeService} from '../../egress-income/egress-income.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {
  currentUserName: string;
  currentUserSubscription: Subscription = new Subscription();

  constructor(public authService: AuthService,
              private store: Store<AppState>,
              public egressIncomeService: EgressIncomeService) {
  }

  ngOnInit() {
    this.currentUserSubscription = this.store.select('auth')
      .pipe(
        filter(auth => auth.user != null)
      )
      .subscribe(auth => this.currentUserName = auth.user.name);
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
    this.egressIncomeService.deleteSubscriptions();
  }

  logout() {
    this.authService.logout();
  }
}
