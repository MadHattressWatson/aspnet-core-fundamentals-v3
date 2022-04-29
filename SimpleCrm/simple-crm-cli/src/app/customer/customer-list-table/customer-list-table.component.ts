import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../customer.model';

@Component({
  selector: 'crm-customer-list-table',
  templateUrl: './customer-list-table.component.html',
  styleUrls: ['./customer-list-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,


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

  trackByCustomerId(index:number,cust: Customer):number{
    return cust.CustomerId;
  }

  openDetail(customer: Customer): void {
    if(customer) {
    this.router.navigate([`./customers/${customer.customerId}`]);
  }
  }

}


