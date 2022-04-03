import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlatformLocation } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { AccountService } from '../account.service';

@Component({
    selector: 'crm-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
     loginType: 'undecided' | 'password' | 'microsoft' | 'google' = 'undecided';
     currentUser: Observable<UserSummaryViewModel>;
     loginForm: FormGroup;

  constructor(
      private fb: FormBuilder,
      private accountService: AccountService,
      public snackBar: MatSnackBar,
      private router: Router,
      private platformLocation: PlatformLocation,
  ) {
      this.currentUser = this.accountService.user;
      this.loginForm = this.fb.group({
        emailAddress: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
      });
  }

// partial file.  This just shows the new code to load the OAuth settings.

  /**
  * This method toggles the display to the first spinner and an option to use another
  * option instead.  This is when its time to query your server for the OAuth keys to use,
  * which is better than storing the keys a second time in the Angular source code.
  * Notice this does not get back the private secret key, only the public clientId.
  */
 useGoogle(): void {
   // use this method call from a button click on the "Use Google" icon of the signin option selector page.
   this.loginType = 'google';
   this.snackBar.open('Signing In with Google...', '', { duration: 2000 });
   const baseUrl =
     'https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?';
   this.accountService.loginGoogleOptions().subscribe((opts: { [key: string]: string; }) => {
     // when the server returns the ClientId and other options, build the url and redirect the user
     const options: { [key: string]: string } = {
       ...opts,
       response_type: 'code',
       prompt: 'consent',
       access_type: 'offline',
       flowName: 'GeneralOAuthFlow',
       redirect_uri:
        //  window.location.origin + https:simplecrm.com
         this.platformLocation.getBaseHrefFromDOM() + // baseHref of the Angular app, e.g. just /
         'signin-google', // the route on this Angular app to come back to after login at Google
     };
     console.log(options['redirect_uri']); // just debugging...
     let params = new HttpParams();
     for (const key of Object.keys(options)) {
       params = params.set(key, options[key]); // encodes values automatically.
     }

     window.location.href = baseUrl + params.toString(); // redirect the browser to Google
   });
 }
}

