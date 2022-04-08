import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlatformLocation } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { AccountService } from '../account.service';
import { UserSummaryViewModel } from '../account.model';




@Component({
    selector: 'crm-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],

})
export class LoginComponent
{
    @Input()
     signInError : string;
     loginType: 'undecided' | 'password' | 'microsoft' | 'google' | undefined;
     currentUser: Observable<UserSummaryViewModel>;
     loginForm: FormGroup;

  constructor(
      public route: ActivatedRoute,
      private fb: FormBuilder,
      private accountService: AccountService,
      public snackBar: MatSnackBar,
      private router: Router,
      private platformLocation: PlatformLocation,
      ) {
      this.signInError = 'Wrong Password'
      this.currentUser = this.accountService.user;
      this.loginForm = this.fb.group({
        emailAddress: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
      });

    {
     this.snackBar.open('Authorizing with Microsoft...',  '', {duration: 1600});
     const baseUrl = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?';
     this.accountService.loginMicrosoftOptions().subscribe(opts => {
       const options: {[key: string]: string} = {
         ...opts,
         response_type: 'code',
         redirect_uri: window.location.origin + this.platformLocation.getBaseHrefFromDOM() + 'signin-microsoft',
       };

       let params = new HttpParams();
       for (const key of Object.keys(options)) {
         params = params.set(key, options[key]); // encodes values automatically.
       }

       window.location.href = baseUrl + params.toString();
     });

    }
  }
}

//  useGoogle(): void {
//    // use this method call from a button click on the "Use Google" icon of the signin option selector page.
//    this.loginType = 'google';
//    this.snackBar.open('Signing In with Google...', '', { duration: 2000 });
//    const baseUrl =
//      'https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?';
//    this.accountService.loginGoogleOptions().subscribe((opts: { [key: string]: string; }) => {
//      // when the server returns the ClientId and other options, build the url and redirect the user
//      const options: { [key: string]: string } = {
//        ...opts,
//        response_type: 'code',
//        prompt: 'consent',
//        access_type: 'offline',
//        flowName: 'GeneralOAuthFlow',
//        redirect_uri:
//         //  window.location.origin + https:simplecrm.com
//          this.platformLocation.getBaseHrefFromDOM() + // baseHref of the Angular app, e.g. just /
//          'signin-google', // the route on this Angular app to come back to after login at Google
// //      };
//      console.log(options['redirect_uri']); // just debugging...
//      let params = new HttpParams();
//      for (const key of Object.keys(options)) {
//        params = params.set(key, options[key]); // encodes values automatically.
//      }

//      window.location.href = baseUrl + params.toString(); // redirect the browser to Google
//    }),
//   }

