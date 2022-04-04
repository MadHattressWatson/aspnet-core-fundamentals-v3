import { Component } from '@angular/core';
import { Customer } from '../customer.model';
import { MatDialog } from '@angular/material/dialog';
import { CustomerService } from '../customer.service';
import { Observable, of } from 'rxjs';
import { CustomerCreateDialogComponent } from '../customer-create-dialog/customer-create-dialog.component';
import { Router } from '@angular/router';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';



@Component({
  selector: 'crm-customer-list-page',
  templateUrl: './customer-list-page.component.html',
  styleUrls: ['./customer-list-page.component.scss'],
})
export class CustomerListPageComponent {
  displayColumns = ['icon', 'name', 'phone', 'email', 'status', 'actions'];
  filterForm: FormGroup | undefined;
  filteredContacts$: Observable<Customer[]>;
  contactCtrl: FormControl;



  constructor(
    private customerService: CustomerService,
    private router: Router,
    public dialog: MatDialog
  )
  {
    this.contactCtrl = new FormControl();
    this.filteredContacts$ = this.contactCtrl.valueChanges.pipe(
      debounceTime(700),
      switchMap((formValue:string)=>
      {
        return this.customerService.search(formValue)
      }));
  }

  openDetail(customer: Customer): void {
    if(customer) {
    this.router.navigate([`./customer/${customer.customerId}`]);
  }
}

  addCustomer(): void {
    const dialogRef = this.dialog.open(CustomerCreateDialogComponent, {
      width: '250px',
      data: null,
    });
  };
}







