import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Customer } from '../customer.model';
import { customerFeatureKey } from './customer.store';
import { CustomerState, customerStateAdapter } from './customer.store.model';


const getCustomerFeature = createFeatureSelector<CustomerState>(customerFeatureKey);

const { selectAll: customerSearchResults} = customerStateAdapter.getSelectors();

export const selectCustomers = createSelector(getCustomerFeature, customerSearchResults);
