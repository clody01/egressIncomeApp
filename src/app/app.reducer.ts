import * as fromUI from './shared/ui.reducer';
import * as fromAUTH from './auth/auth.reducer';
import {ActionReducerMap} from '@ngrx/store';

export interface AppState {
  ui: fromUI.State;
  auth: fromAUTH.State;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: fromUI.uiReducer,
  auth: fromAUTH.authReducer
};
