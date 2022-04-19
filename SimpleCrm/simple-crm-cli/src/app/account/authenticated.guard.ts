import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map } from 'rxjs';
import { UserSummaryViewModel } from './account.model';
import { AccountService } from './account.service';
import { Observable } from 'rxjs';


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
      return this.accountService.user.pipe(
        map((user: UserSummaryViewModel) => {
          if (user.name === 'Anonymous') {
            return this.router.createUrlTree(['./login']);
          }

          return true;
        })
      );
  }
}














