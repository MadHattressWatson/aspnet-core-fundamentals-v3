import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule} from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { CustomerListPageComponent } from './customer-list-page/customer-list-page.component';
import { CustomerRoutingModule } from './customer-routing.module';
import  { HttpClientModule } from '@angular/common/http';
import { CustomerService } from './customer.service';
import { CustomerMockService } from './customer-mock.service';

@NgModule({
  declarations: [CustomerListPageComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    CustomerRoutingModule
],
  providers: [
    {
      provide: CustomerService, //the base class requested bu components
      useClass: CustomerMockService //the derived type to be injected instead.
    }
  ]
})

export class CustomerModule { }
