import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer.model';
import { MatDialog } from '@angular/material/dialog';
import { CustomerService } from '../customer.service';
import { Observable, of } from 'rxjs';
import { CustomerCreateDialogComponent } from '../customer-create-dialog/customer-create-dialog.component';
import { Router } from '@angular/router';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';
import { combineLatest } from 'rxjs';
import {  }

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
  filtered: FormControl = new FormControl('');


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
      switchMap((formValue:string | filteredResults$)=>{
        if(typeof formValue === 'string'){
          const term = formValue;
          return this['filterdResults$'].searchByEmail(orgId,term,20);
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


// ngOnInit() {
//   this.obs=this.mform.valueChanges
//     .pipe(
//       debounceTime(700),
//       switchMap(id => {

//         console.log(id)
//         return this.http.get(url)

//       })
//     )
//     .subscribe(data => console.log(data));
// }






function newFormControl(): any {
  throw new Error('Function not implemented.');
}

function orgId(orgId: any, term: string, arg2: number): any {
  throw new Error('Function not implemented.');
}

function ngOnInit() {
  throw new Error('Function not implemented.');
}

