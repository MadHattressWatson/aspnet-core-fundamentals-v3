import { PlatformLocation } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { anonymousUser, UserSummaryViewModel} from './account.model';
import { Observable } from 'rxjs';
import { CredentialsViewModel, MicrosoftOptions, MicrosoftAuthViewModel} from './account.model';

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
    this.baseUrl = environment.server + environment.apiUrl + 'auth';
    this.cachedUser.next(anonymousUser()); // <- this function to be added to 'account.model.ts'.
   // you can make up what makes an anonymous user, I usually set the name to 'anonymous' (most users name is an email address)

   const cu = localStorage.getItem('currentUser'); // <- localStorage is really useful
    if (cu) {
      this.cachedUser.next(JSON.parse(cu));  // <- JSON is built into JavaScript and always available.
      if (!this.isAnonymous){
        this.loginCompleteHandler(false, this.verifyUser(this.cachedUser.value.()));
      }
    }
  }

  get user(): BehaviorSubject<UserSummaryViewModel> {
      // components can pipe off of this to get a new value as they login/logout
      return this.cachedUser;
    }

  set user(user: UserSummaryViewModel): void {
        // called by your components that process a login from password, Google, Microsoft
        this.cachedUser.next(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
    }

  // public get currentUserValue(): UserSummaryViewModel {
  //   return this.currentUserSubject.value;
  // }
  get isAnonymous(): boolean {
    return this.cachedUser.value.name === 'Anonymous';
  }
  // public login() {
  //   this.cachedUser.value.name = anonymousUser();
  //   localStorage.removeItem('currentUser');
  //   this.router.navigate(['/account/login']);
  // }

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
  /*
    Name and password login
  */
  public loginPassword(credentials: CredentialsViewModel) {
    this.loginCompleteHandler(false,
      this.http.post<UserSummaryViewModel>(this.baseUrl + 'login', credentials)
    );
  }

  public logout() {
        this.cachedUser.next (anonymousUser());
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.http.post<any>(this.baseUrl + '/logout', {}).subscribe(() => {
        this.router.navigate(['./account/logout']);
      });
  }

  public loginMicrosoftOptions(): Observable<MicrosoftOptions> {
    return this.http.get<MicrosoftOptions>(
      this.baseUrl + 'external/microsoft'
    );
  }

  public loginMicrosoftCallback(code: string, state: string) {
    this.snackBar.open('Validating Login...', '', { duration: 8000 });
    const body = { accessToken: code, state, baseHref: this.platformLocation.getBaseHrefFromDOM() };
    this.loginCompleteHandler(true,
      this.http.post<UserSummaryViewModel>(this.baseUrl + 'external/microsoft', body)
    );
  }

  public verifyUser(user: UserSummaryViewModel): Observable<UserSummaryViewModel> {
    const model = {};
    const options = !user || !user.jwtToken ? {}
      : { headers : { Authorization: 'Bearer ' + user.jwtToken }};
    return this.http.post<UserSummaryViewModel>(
      this.baseUrl + 'verify',
      model,
      options
    );
  }

  private loginCompleteHandler(navigate: boolean, caller: Observable<UserSummaryViewModel>) {
    caller.subscribe(
      user => {
        this.loginComplete(user);
      },
      resp => {
        console.error(resp);
        this.snackBar.open(resp.error.message, 'Ok')
        if (navigate) {
          this.router.navigate(['not-authorized']);
        }

      }
    );
  }

  private loginComplete(data: UserSummaryViewModel) {
    this.cachedUser = data;
    localStorage.setItem('currentUser', JSON.stringify(data));
    if (!data.roles || data.roles.length === 0) {
      // no access?  shouldn't happen, redirect to a page not needing login

      this.snackBar.open('No Access', '', { duration: 3000 });
      this.router.navigate(['not-authorized']);
    } else {
      this.snackBar.open('Login Complete', '', { duration: 3000 });
      const returnUrl = localStorage.getItem('loginReturnUrl') || '';
      this.router.navigate([returnUrl]);
    }
  }

}



