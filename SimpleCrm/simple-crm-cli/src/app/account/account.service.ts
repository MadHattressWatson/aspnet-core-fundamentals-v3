import { PlatformLocation } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl: string;
  private cachedUser = new BehaviorSubject<UserSummaryViewModel>(anonymousUser());
  loginGoogleOptions: any;
  // ^^ UserSummaryViewModel is a new model class to add in 'account.models.ts'
  //      it has properties matching the same named class in the C# project.
  //   BehaviorSubject is a type of Observable you can easily set the next value on.
  //   Note the one above initializes it to the result of method call anonymousUser()

  constructor(
    private http: HttpClient, // part of Angular to make Http requests
    private router: Router, // part of Angular router, for navigating the user within the app
    private platformLocation: PlatformLocation,
    private snackBar: MatSnackBar // a.k.a. 'toast', or a temporary notice
  ) {
    this.baseUrl = environment.server + environment.apiUrl + 'auth/'; // <- add these properties to your environments.ts file
    // the following sets the cached initial user to a blank UserSummary with name 'Anonymous'.
    this.cachedUser = anonymousUser(); // <- this function to be added to 'account.models.ts'.
    // you can make up what makes an anonymous user, I usually set the name to 'anonymous' (most users name is an email address)
    const cu = localStorage.getItem('currentUser'); // <- localStorage is really useful
    if (cu) {
      // if already logged in from before, just use that... it has a JWT in it.
      this.cachedUser.next(JSON.parse(cu));  // <- JSON is built into JavaScript and always available.
    }
  }

  get user(): BehaviorSubject<UserSummaryViewModel> {
     // components can pipe off of this to get a new value as they login/logout
    return this.cachedUser;
  }
  setUser(user: UserSummaryViewModel): void {
      // called by your components that process a login from password, Google, Microsoft
      this.cachedUser.next(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
  }

  // TODO: add isAnonymous property get here (see property get 'user()' above),
  //  calculate true or false accordingly using an RxJs pipe from the cachedUser

  // optional: add other methods that calculate if the current cachedUser has
  // a specific role or permission in the app
}

function anonymousUser(): UserSummaryViewModel {
  throw new Error('Function not implemented.');
}

