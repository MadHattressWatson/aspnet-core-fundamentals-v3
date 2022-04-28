import { PlatformLocation } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { anonymousUser, UserSummaryViewModel} from './account.model';
import { Observable } from 'rxjs';
import { CredentialsViewModel, MicrosoftOptions} from './account.model';



@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl: string;
  private cachedUser = new BehaviorSubject<UserSummaryViewModel>(anonymousUser());


  constructor(
    private http: HttpClient, // part of Angular to make Http requests
    private router: Router, // part of Angular router, for navigating the user within the app
    private platformLocation: PlatformLocation,
    private snackBar: MatSnackBar // a.k.a. 'toast', or a temporary notice
  )
  {
    this.baseUrl = environment.server + environment.apiUrl + 'auth/';
    const cu = localStorage.getItem('currentUser'); // <- localStorage is really useful
    if (cu) {
      this.cachedUser.next(JSON.parse(cu));  // <- JSON is built into JavaScript and always available.

    }
  }

  get user(): BehaviorSubject<UserSummaryViewModel> {
       return this.cachedUser;
    }

  set User(user: UserSummaryViewModel): void {
        // called by your components that process a login from password, Google, Microsoft
        this.cachedUser.next(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
    }
    public loginMicrosoftOptions(): Observable<MicrosoftOptions> {
      return this.http.get<MicrosoftOptions>(
        this.baseUrl + 'external/microsoft'
      );
    }
     public loginPassword(credentials: CredentialsViewModel): Observable<UserSummaryViewModel>{
      this.cachedUser.next(anonymousUser());
      localStorage.removeItem('currentUser');
      return this.http.post<UserSummaryViewModel>(this.baseUrl + 'login', credentials);
    }

    loginComplete(user: UserSummaryViewModel, _message: string) {
      this.setUser(user);

    }

    public loginMicrosoft(code: string, state: string): Observable<UserSummaryViewModel> {
      const body = { accessToken: code, state, baseHref: this.platformLocation.getBaseHrefFromDOM() };
      return this.http.post<UserSummaryViewModel>(this.baseUrl + 'external/microsoft', body);
    }
    public logout(options: {navigate: boolean} = {navigate: true}): void {
      this.cachedUser.next (anonymousUser());
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
    }
  }




