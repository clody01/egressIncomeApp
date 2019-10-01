import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';

// Modules
import {AppRoutingModule} from './app-routing.module';

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
// Graphs

// Personals modules
import {AuthModule} from './auth/auth.module';
import {EgressIncomeModule} from './egress-income/egress-income.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    EgressIncomeModule,
    AppRoutingModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
