import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from './account/authenticated.guard';
import { LoginComponent } from './account/login/login.component';
import { NotAuthorizedComponent } from './account/not-authorized/not-authorized.component';
import { RegistrationComponent } from './account/registration/registration.component';
import { SigninMicrosoftComponent } from './account/signin-microsoft/signin-microsoft.component';


const routes: Routes = [
  {
    // path: 'account',
    // children: [
      // {
        path: 'register',
        component: RegistrationComponent
      },
      {
        path: 'login',
        component: LoginComponent,
      },
  {
    path: 'signin-microsoft',
    component: SigninMicrosoftComponent,
  },
  // {
  //   path: 'signin-google',
  //   component: SigninGoogleComponent,
  // },
  {
    path: 'not-authorized',
    component: NotAuthorizedComponent,
    // generated in the prior lesson. you may want to move it to this module and out of AppModule.
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule { }

