import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'crm-customer-list-page',
  templateUrl: './customer-list-page.component.html',
  styleUrls: ['./customer-list-page.component.scss']
})
export class CustomerListPageComponent implements OnInit {

  customers: Customer[];

  constructor() { }

  ngOnInit(): void {
    this.customers = [
      {
        customerId: 1,
        lastContactDate: '2020-01-01',
        preferredContactMethod: 'email'
      }
    ];
  }

}
