import * as fromUIAction from './ui.actions';

export interface State {
  isLoading: boolean;
}

const initState: State = {
  isLoading: false
};

export function uiReducer(state = initState, action: fromUIAction.actions) {
  switch (action.type) {
    case fromUIAction.ACTIVATE_LOADING:
      return {
        isLoading: true
      };
      case fromUIAction.DEACTIVATE_LOADING:
      return {
        isLoading: false
      };
    default:
      return state;
  }
}
