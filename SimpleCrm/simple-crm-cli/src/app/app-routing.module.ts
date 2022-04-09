import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from './account/authenticated.guard';
import { LoginComponent } from './account/login/login.component';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./customers/customers.module').then(mod => mod.CustomersModule)
    // redirectTo: 'customers',
    // pathMatch: 'full'
  },

  // {
  //   path: 'admin',
  //   canActivate: [AuthenticatedGuard],
  //   data: { roles: [Role.Admin]}
  // },
  {
    path: 'login',
    component: LoginComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  // imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthenticatedGuard]
})
export class AppRoutingModule { }

