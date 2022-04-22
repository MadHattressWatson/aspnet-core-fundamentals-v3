import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Customer } from '../customer.model';
import { MatDialog } from '@angular/material/dialog';
import { CustomerService } from '../customer.service';
import { combineLatest, Observable } from 'rxjs';
import { CustomerCreateDialogComponent } from '../customer-create-dialog/customer-create-dialog.component';
import { Router } from '@angular/router';
import { debounceTime, map, startWith, switchMap } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'crm-customer-list-page',
  templateUrl: './customer-list-page.component.html',
  styleUrls: ['./customer-list-page.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})

export class CustomerListPageComponent {
  displayColumns = ['icon', 'name', 'phone', 'email', 'status', 'actions'];
  filterInput = new FormControl();
  filteredContacts$: Observable<Customer[]>;
  contactCtrl: FormControl;

  constructor(
    private customerService: CustomerService,
    private router: Router,
    public dialog: MatDialog,
    //constructor(private cdr: ChangeDetectorRef) {}
  )
  {
    this.contactCtrl = new FormControl();
    this.filteredContacts$ = this.contactCtrl.valueChanges.pipe(
      startWith(''),
      debounceTime(700),
      switchMap((formValue:string)=>
      {
        return this.customerService.search(formValue)
      }),
    );
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

dialogRef.afterClosed().subscribe((customer:Customer) =>{
  this.customerService.save(customer)
  });
}
}





