import { PlatformLocation } from '@angular/common';
import { Component, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { UserSummaryViewModel } from '../account.model';

@Component({
  selector: 'crm-jwt-interceptor',
  templateUrl: './jwt-interceptor.component.html',
  styleUrls: ['./jwt-interceptor.component.scss']
})

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private platformLocation: PlatformLocation
  ) {}

  private getJwtToken(): string | null {
    const cu = localStorage.getItem('currentUser');
    let cachedUser: UserSummaryViewModel;
    if (!cu) {
      return null;
    }
    cachedUser = JSON.parse(cu);
    if (!cachedUser) {
      return null;
    }
    return cachedUser.jwtToken;
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const jwtToken = this.getJwtToken();
    if (jwtToken) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + jwtToken,
        },
      });
    }

    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {},
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              window.location.href = this.platformLocation.getBaseHrefFromDOM() + 'account/login';
            }
          }
        }
      )
    );
  }
}

