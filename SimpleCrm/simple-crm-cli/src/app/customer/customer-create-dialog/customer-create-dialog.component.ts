import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from '../customer.model';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';

@Component({
  selector: 'crm-customer-create-dialog',
  templateUrl: './customer-create-dialog.component.html',
  styleUrls: ['./customer-create-dialog.component.scss']
})

export class CustomerCreateDialogComponent implements OnInit {
  detailForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CustomerCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Customer | null
  ) {
    this.detailForm = this.fb.group({
      firstName: ['', Validators.required], // target form field name is the property name
      lastName: ['', Validators.required],
      phoneNumber: [''],
      emailAddress: ['', Validators.required, Validators.email],
      preferredContactMethod: ['email'] // value in the quotes is the initial value
   });
    if (this.data) { // ensure the object has a value first
     this.detailForm.patchValue(this.data); // the patchValue function updates the form input values.
    // data.firstName will be set into the form input named firstName, and so on
    }
  }

  ngOnInit(): void {
  }

  cancel(): void {

    this.dialogRef.close();
  }

  save(): void {
    if (!this.detailForm.valid){
      return;
    }
    const customer = {...this.data, ...this.detailForm.value };
    this.dialogRef.close(customer);
  }
}
