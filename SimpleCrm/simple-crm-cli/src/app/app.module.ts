import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomerModule } from './customer/customer.module';
import { AccountModule } from './account/account.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './account/jwt-interceptor/jwt-interceptor.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// import { layoutFeatureKey, layoutReducer } from './store/layout.store';
import { EffectsModule } from '@ngrx/effects';
import { AppIconService } from './shared/app-icon.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { environment } from 'src/environments/environment.prod';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CustomerModule,
    AccountModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    RouterModule,
  //   EffectsModule.forRoot([]),

  // StoreModule.forRoot({}), // for no global state, use an empty object,  {}.
  // StoreModule.forFeature(layoutFeatureKey, layoutReducer),
  // StoreDevtoolsModule.instrument({
  //   name: 'Nexul Academy - Simple CRM'
  // }),
  // StoreModule.forRoot({}, {}),
  // StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    AppIconService
  ],
  bootstrap: [AppComponent]

})

export class AppModule {
  constructor(iconService: AppIconService) {}
}






