import * as fromEgressIncomeAction from './egress-income.actions';
import {EgressIncome} from './egress-income.model';

export interface State {
  items: EgressIncome[];
}

const initState: State = {
  items: []
};

export function egressIncomeReducer(state = initState, action: fromEgressIncomeAction.actions) {

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
