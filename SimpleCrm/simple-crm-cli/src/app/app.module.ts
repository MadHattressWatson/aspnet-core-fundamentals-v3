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
import { layoutFeatureKey, layoutReducer } from './store/layout.store';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '../environments/environment';
import { AppIconService } from './assets'

@NgModule({
  declarations: [
    AppComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CustomerModule,
    AccountModule,
    EffectsModule.forRoot([]),

  StoreModule.forRoot({}), // for no global state, use an empty object,  {}.
  StoreModule.forFeature(layoutFeatureKey, layoutReducer),
  StoreDevtoolsModule.instrument({
    name: 'Nexul Academy - Simple CRM'
  }),
  StoreModule.forRoot({}, {}),
  StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],

  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    AppIconService],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(iconService: AppIconService) {}
}






