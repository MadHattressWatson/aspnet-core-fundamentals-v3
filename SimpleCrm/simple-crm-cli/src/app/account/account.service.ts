import { PlatformLocation } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, fromEventPattern, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { MicrosoftAuthViewModel, anonymousUser, CredentialsViewModel, MicrosoftOptions, UserSummaryViewModel} from './account.???'

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  loginMicrosoftOptions() {
    throw new Error('Method not implemented.');
  }
  loginMicrosoft(code: string, sessionState: string) {
    throw new Error('Method not implemented.');
  }
  private baseUrl: string;
  private cachedUser = new BehaviorSubject<UserSummaryViewModel>(anonymousUser());
  currentUserSubject: any;

  constructor(
    private http: HttpClient, // part of Angular to make Http requests
    private router: Router, // part of Angular router, for navigating the user within the app
    private platformLocation: PlatformLocation,
    private snackBar: MatSnackBar // a.k.a. 'toast', or a temporary notice
  )
  {
    this.baseUrl = environment.server + environment.apiUrl + 'auth';
    this.cachedUser = anonymousUser(); // <- this function to be added to 'account.models.ts'.
   // you can make up what makes an anonymous user, I usually set the name to 'anonymous' (most users name is an email address)

   const cu = localStorage.getItem('currentUser'); // <- localStorage is really useful
    if (cu) {
      this.cachedUser.next(JSON.parse(cu));  // <- JSON is built into JavaScript and always available.
      if (!this.isAnonymous){
        this.loginCompleteHandler(false, this.verifyUser(this.cachedUser));
      }
    }
  }
  loginCompleteHandler(arg0: boolean, arg1: any) {
    throw new Error('Method not implemented.');
  }
  verifyUser(cachedUser: BehaviorSubject<UserSummaryViewModel>): any {
    throw new Error('Method not implemented.');
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

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  get isAnonymous(): boolean {
    return this.cachedUser.name === 'Anonymous';
  }

  public login(username: string, password: string) {
      return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
          .pipe(map(user => {
              // login successful if there's a jwt token in the response
              if (user && user.token) {
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('currentUser', JSON.stringify(user));
                  this.currentUserSubject.next(user);
              }

              return user;
          }));
  }

  public logout() {
      this.cachedUser = anonymousUser();
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
  }

  }


