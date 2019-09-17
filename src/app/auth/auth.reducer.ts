import * as fromAuthActions from './auth.action';
import {User} from './user.model';

export interface State {
  user: User;
}

const initState: State = {
  user: null
};

export function authReducer(state = initState, action: fromAuthActions.actions) {
  switch (action.type) {
    case fromAuthActions.SET_USER:
      return {
        user: {... action.user}};
    default:
      return state;
  }
}
