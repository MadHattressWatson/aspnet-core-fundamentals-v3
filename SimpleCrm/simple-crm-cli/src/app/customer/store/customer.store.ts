import { createAction, props, createReducer, on, Action } from '@ngrx/store';
import { CustomerSearchCriteria, initialCustomerState, CustomerState } from './customer.store.model';
import { Customer } from '../customer.model';


export const customerSearchAction = createAction(
  '[CUSTOMERS] Search Start',
  props<{criteria: CustomerSearchCriteria}>()
);

export const customersSearchCompleteAction = createAction(
  '[CUSTOMERS] Search Complete',
  props<{result: Customer[]}>()
);


export const customerFeatureKey = 'customer';

const rawCustomerReducer = createReducer (
  initialCustomerState,
  on(customerSearchAction, (state, action) => ({
    ...state,
    criteria: action.criteria,
    searchStatus: 'searching'
  })),
)


/** Provide reducer in AOT-compilation happy way */
export function customerReducer(state: CustomerState, action: Action) {
return rawCustomerReducer(state, action);
}


