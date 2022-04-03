import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'account',
    children: [
      {
        path: 'register',
        component: RegistrationComponent
      },
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
  {
    path: 'signin-microsoft',
    component: SigninMicrosoftComponent,
  },
  {
    path: 'signin-google',
    component: SigninGoogleComponent,
  },
  {
    path: 'not-authorized',
    component: NotAuthorizedComponent,
    // generated in the prior lesson. you may want to move it to this module and out of AppModule.
  },
