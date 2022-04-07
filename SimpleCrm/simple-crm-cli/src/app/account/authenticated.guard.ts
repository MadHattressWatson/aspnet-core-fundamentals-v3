import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
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
      map(user =>{
        if (user.name === 'Anonymous'){
          this.router.navigate(['./account/login']);
          return false;
        }

      if (this.accountService.isAnonymous) {
        this.accountService.login();
        return false;
      }
      const User = this.accountService.user;
      if (!user || !user.roles || user.roles.length === 0) {
        // role not authorized redirect to home page
        this.router.navigate(['not-authorized']);
        return false;
       }
        // authorized to return true
          return true;

      });

    }
  }












