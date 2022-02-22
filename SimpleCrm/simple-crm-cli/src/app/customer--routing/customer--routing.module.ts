import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomerListPageComponent} from './customer-list-page/customer-list-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'customers',
    pathMatch: 'full'
    component: CustomerListPageComponent
  }
  ];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CustomerListPageComponenet { }
