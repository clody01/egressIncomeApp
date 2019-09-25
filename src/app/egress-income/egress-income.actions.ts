import {Action} from '@ngrx/store';
import {EgressIncome} from './egress-income.model';

export const SET_ITEMS = '[Egress Income] SET ITEMS';
export const UNSET_ITEMS = '[Egress Income] UNSET ITEMS';


export class SetItemsAction implements Action {
  readonly type = SET_ITEMS;
  constructor(public actionItems: EgressIncome[]) {

  }
}

export class UnSetItemsAction implements Action {
  readonly type = UNSET_ITEMS;
}

export type actions = SetItemsAction | UnSetItemsAction  ;
