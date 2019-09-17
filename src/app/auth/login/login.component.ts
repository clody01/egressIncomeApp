import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducer';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {
  loading: boolean;
  subscription: Subscription;

  constructor(public authService: AuthService, private store: Store<AppState>) {
  }

  ngOnInit() {
    this.subscription = this.store.select('ui').subscribe(ui => {
      this.loading = ui.isLoading;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(userData: any) {
    if (userData != null) {
      this.authService.login(userData.email, userData.password);
    }
    // console.log(userData);
  }
}
