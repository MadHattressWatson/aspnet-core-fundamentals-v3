import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticatedGuard } from './authenticated.guard';

@Injectable({
  providedIn: 'root'
 })
export class AuthenticatedGuard implements CanActivate {
  authService: any;
  router: any;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      var isAuthenticated = this.authService.getAuthStatus();
        if (!isAuthenticated) {
            this.router.navigate(['/login']);
        }
        return true;
    }
}


