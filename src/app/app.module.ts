import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {EgressIncomeComponent} from './egress-income/egress-income.component';
import {StatisticComponent} from './egress-income/statistic/statistic.component';
import {DetailComponent} from './egress-income/detail/detail.component';
import {FooterComponent} from './shared/footer/footer.component';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {SidebarComponent} from './shared/sidebar/sidebar.component';

// Modules
import {AppRoutingModule} from './app-routing.module';
import {ReactiveFormsModule} from '@angular/forms';

// Firebase
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
// import {AngularFireAuthModule} from '@angular/fire/auth';

// NGRX
import {StoreModule} from '@ngrx/store';
import {appReducers} from './app.reducer';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

// Environment
import {environment} from '../environments/environment';
import {OrderEgressIncomePipe} from './egress-income/order-egress-income.pipe';
// Graphs
import {ChartsModule} from 'ng2-charts';

// Personals modules
import {AuthModule} from './auth/auth.module';
import {SharedModule} from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    // LoginComponent,
    // RegisterComponent,
    DashboardComponent,
    EgressIncomeComponent,
    StatisticComponent,
    DetailComponent,
    // FooterComponent,
    // NavbarComponent,
    // SidebarComponent,
    OrderEgressIncomePipe,
  ],
  imports: [
    BrowserModule,
    AuthModule,
    SharedModule,
    AppRoutingModule,
    // FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    //  AngularFireAuthModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    ChartsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
