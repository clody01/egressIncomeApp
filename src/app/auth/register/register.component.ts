import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducer';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {
  loading: boolean;
  subscription: Subscription = new Subscription();

  constructor(public authService: AuthService, private store: Store<AppState>) {
  }

  ngOnInit() {
    this.subscription = this.store.select('ui').subscribe(ui => {
      this.loading = ui.isLoading;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(userData: any) {
    if (userData != null) {
      this.authService.createUser(userData.name, userData.email, userData.password);
    }
    // console.log(userData);
  }
}
