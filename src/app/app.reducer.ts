import * as fromUI from './shared/ui.reducer';
import * as fromAUTH from './auth/auth.reducer';
// import * as fromEgressIncome from './egress-income/egress-income.reducer';
import {ActionReducerMap} from '@ngrx/store';
import {EgressIncome} from './egress-income/egress-income.model';

export interface AppState {
  ui: fromUI.State;
  auth: fromAUTH.State;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: fromUI.uiReducer,
  auth: fromAUTH.authReducer
};
