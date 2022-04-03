import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule  } from '@angular/material/toolbar';
import { MatSidenavModule  } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { CustomerModule } from './customer/customer.module';
import { AppIconsService } from './shared/app-icons.service';
import { StatusIconPipe } from './customer/status-icon.pipe';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './account/login.component';
import { AdminComponent } from './account/admin'


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LoginComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CustomerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule
    ],
  providers: [AppIconsService],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(iconService: AppIconsService) {}
}

export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(catchError(err => {
          if ([401, 403].indexOf(err.status) !== -1) {
              // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
              this.authenticationService.logout();
              location.reload(true);
          }

          const error = err.error.message || err.statusText;
          return throwError(error);
      }))
  }
}
