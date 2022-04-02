import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer.model';
import { MatDialog } from '@angular/material/dialog';
import { CustomerService } from '../customer.service';
import { Observable, of } from 'rxjs';
import { CustomerCreateDialogComponent } from '../customer-create-dialog/customer-create-dialog.component';
import { Router } from '@angular/router';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'crm-customer-list-page',
  templateUrl: './customer-list-page.component.html',
  styleUrls: ['./customer-list-page.component.scss'],
})
export class CustomerListPageComponent implements OnInit {
  [x: string]: any;
  customers$: Observable<Customer[]>;
  displayColumns = ['icon', 'name', 'phone', 'email', 'status', 'actions'];
  filterForm: FormGroup | undefined;
  filteredContact$: any;
  contactCtrl: any;

  constructor(
    private customerService: CustomerService,
    private router: Router,
    public dialog: MatDialog
  )
  {
    this.contactCtrl = newFormControl();
    this.customers$ = this.customerService.search('');
    this.filteredContact$ = this.contactCtrl.valueChanges.pipe(
      debounceTime(700),
      switchMap((formValue:string | OrganizationalUserAccess)=>{
        if(typeof formValue === 'string'){
          const term = formValue;
          return this['organizationUserSvc'].searchByEmail(orgId,term,20);
      }
      return of([]);
    }),
  }
  ngOnInit(): void {}

  openDetail(customer: Customer): void {
    if(customer) {
    this.router.navigate([`./customer/${customer.customerId}`]);
  }
}

  addCustomer(): void {
    const dialogRef = this.dialog.open(CustomerCreateDialogComponent, {
      width: '250px',
      data: null,
    }),
  };
}







