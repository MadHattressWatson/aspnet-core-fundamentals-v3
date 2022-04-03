import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root'
 })
export class AuthenticatedGuard implements CanActivate {
  authService: any;
constructor(
private router: Router,
private authenticationService: AuthenticationService
){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const currentUser = this.authenticationService.currentUserValue;
      if (currentUser) {
          // check if route is restricted by role
          if (route.data['roles'] && route.data['roles'].indexOf(currentUser.role) === -1) {
              // role not authorized redirect to home page
              this.router.navigate(['/']);
              return false;
          }

          // authorized to return true
          return true;
      }

      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
  }
}









