import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from './account/authenticated.guard';
import { LoginComponent } from './account/login/login.component';
import { NotAuthorizedComponent } from './account/not-authorized/not-authorized.component';
import { RegistrationComponent } from './account/registration/registration.component';
import { SigninGoogleComponent } from './account/signin-google/signin-google.component';
import { SigninMicrosoftComponent } from './account/signin-microsoft/signin-microsoft.component';



const routes: Routes = [
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
      path: 'sigin-google',
      copmponent: SigninGoogleComponent,
    },
    {
      path: 'notauthrized',
      Component: NotAuthorizedComponent,
    }
  ];


    // loadChildren: () => import('./customers/customers.module').then(mod => mod.CustomersModule)
    // redirectTo: 'customers',
    // pathMatch: 'full'
  },

  // {
  //   path: 'admin',
  //   canActivate: [AuthenticatedGuard],
  //   data: { roles: [Role.Admin]}
  // },

@NgModule({
  // imports: [RouterModule.forRoot(routes)],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthenticatedGuard]
})
export class AppRoutingModule { }

