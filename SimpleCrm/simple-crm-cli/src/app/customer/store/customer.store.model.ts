import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { Customer } from "../customer.model";
import { EntityState } from '@ngrx/entity/src/models';

export interface CustomerSearchCriteria {
  term: string;
}
export type SearchStatus = '' | 'searching' | 'complete';

export interface CustomerState extends EntityState<Customer>{
  searchStatus: SearchStatus;
  criteria: CustomerSearchCriteria;
}


export const customerStateAdapter: EntityAdapter<Customer> = createEntityAdapter<Customer>({
  selectId: (item: Customer) => item.customerId // <-- defines the key property
});

export const initialCustomerState: CustomerState = customerStateAdapter.getInitialState({
  searchStatus: '',
  criteria: {term: ''}
});

