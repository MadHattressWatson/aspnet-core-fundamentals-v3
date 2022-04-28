import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from '../account/authenticated.guard';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
// import { CustomerListPageComponent } from './customer-list-page/customer-list-page.component';
import { CustomerListTableComponent } from './customer-list-table/customer-list-table.component';


const routes: Routes = [
  // {
  //   path: 'customers',
  //   pathMatch: 'full',
  //   component: CustomerListTableComponent,
  // },
  {
    path: 'customer/:id',
    pathMatch: 'full',
    component: CustomerDetailComponent,
    canActivate: [AuthenticatedGuard]
  },

    ]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
