import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Customer } from './customer.model';

@Injectable()
  export class CustomerService {


  constructor(private http: HttpClient) { }

  search(term: string): Observable<Customer[]> {
    return this.http.get<Customer[]>('/api/customer/search?term=' + term);
  }

  get(customerId: number){
    return this.http.get<Customer>('/api/customers/' + customerId);
  }

  save(customer: Customer): Observable<Customer> {
    if (customer.customerId > 0) {
      const params = new HttpParams();
      params.set('id', '' + customer.customerId);
      return this.http.post<Customer>('/api/customers/:id', customer, {
        params // same as 'params: params'
      } );
    }
    return this.http.post<Customer>('/api/customers', customer);
  }
}

