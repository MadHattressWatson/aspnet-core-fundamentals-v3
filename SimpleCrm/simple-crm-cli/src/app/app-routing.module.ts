import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticatedGuard } from './authenticated.guard';
import { LoginComponent } from '/login';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'customers',
    pathMatch: 'full'
  },

  {
    path: 'admin',
    canActivate: [AuthenticatedGuard],
    data: { roles: [Role.Admin]}
  },
  {
    path: 'login',
    component: LoginComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthenticatedGuard]
})
export class AppRoutingModule { }

