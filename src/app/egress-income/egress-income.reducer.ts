import * as fromEgressIncomeAction from './egress-income.actions';
import {EgressIncome} from './egress-income.model';
import {AppState} from '../app.reducer';


export interface EgressIncomeState {
  items: EgressIncome[];
}

export interface AppState extends AppState {
  egressIncome: EgressIncomeState;
}

const initState: EgressIncomeState = {
  items: []
};

export function egressIncomeReducer(state = initState,
                                    action: fromEgressIncomeAction.actions) {

  switch (action.type) {
    case fromEgressIncomeAction.SET_ITEMS:
      return {
        items: [
          ...action.actionItems.map(item => {
            return {
              ...item
            };
          })
        ]
      };

    case fromEgressIncomeAction.UNSET_ITEMS:
      return {
        items: []
      };
    default:
      return state;
  }
}
