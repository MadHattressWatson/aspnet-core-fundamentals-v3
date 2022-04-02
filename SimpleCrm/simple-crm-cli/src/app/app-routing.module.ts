import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {  AuthenticatedGuard } from './auth.guard';


const routes: Routes = [
{
  path: '',
  redirectTo: 'customers',
  pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthenticatedGuard]
})
export class AppRoutingModule { }
