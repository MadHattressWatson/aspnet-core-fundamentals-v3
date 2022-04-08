import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';
import { SigninMicrosoftComponent } from './signin-microsoft/signin-microsoft.component';
import { SigninGoogleComponent } from './signin-google/signin-google.component';
import { BrowserModule } from '@angular/platform-browser';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { LogoutCompleteComponent } from './logout-complete/logout-complete.component';
import { MatIconModule } from '@angular/material/icon';





@NgModule({
  declarations: [
    NotAuthorizedComponent,
    LoginComponent,
    SigninMicrosoftComponent,
    SigninGoogleComponent,
    LogoutCompleteComponent,

  ],
  imports: [
    AccountRoutingModule,
    CommonModule,
    BrowserModule,
    MatIconModule,

  ]
})


export class AccountModule {}





// export class ErrorInterceptor implements HttpInterceptor {
//   constructor(private authenticationService: AuthenticationService) { }

//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//       return next.handle(request).pipe(catchError(err => {
//           if ([401, 403].indexOf(err.status) !== -1) {
//               // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
//               this.authenticationService.logout();
//               location.reload(true);
//           }

//           const error = err.error.message || err.statusText;
//           return throwError(error);
//       }))
//   }
// }
