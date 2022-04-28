import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../customer.model';

@Component({
  selector: 'crm-customer-list-table',
  templateUrl: './customer-list-table.component.html',
  styleUrls: ['./customer-list-table.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  // <li *ngFor="let customer of customers; trackBy:customerId">{{customer.name}}</li>

})
export class CustomerListTableComponent implements OnInit {

  @Input() customers: Customer[] | undefined | null;
  displayColumns = ['icon','name','phone','email','lastContactDate','status','actions'];

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}


  ngOnInit(): void {
  }

  trackByCustomerId(cust: Customer){
    return cust.customerId;
  }

  openDetail(customer: Customer): void {
    if(customer) {
    this.router.navigate([`./customer/${customer.customerId}`]);
  }
  }

}


