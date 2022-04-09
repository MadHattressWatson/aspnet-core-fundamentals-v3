import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from './account.service';


@Injectable({
  providedIn: 'root'
 })
export class AuthenticatedGuard implements CanActivate {

constructor(
private router: Router,
private accountService: AccountService
){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      localStorage.setItem('loginReturnUrl', state.url);
      if (true) {
        // fake authorization check to simulate not-authorized
        return this.router.createUrlTree(['not-authorized']);
      }

      if (this.accountService.isAnonymous) {
        this.router.navigate(['./account/login']);
        return false;
      }
      const user = this.accountService.user.value;
      if (!user || !user.roles || user.roles.length === 0) {
        // role not authorized redirect to home page
        this.router.createUrlTree(['not-authorized']);
        return false;
       }
        // authorized to return true
          return true;

    }
  }












