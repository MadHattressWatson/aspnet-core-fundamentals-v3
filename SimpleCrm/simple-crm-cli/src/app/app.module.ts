import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomerModule } from './customer/customer.module';
import { AppIconsService } from './shared/app-icons.service';
import { AccountModule } from './account/account.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './account/jwt-interceptor/jwt-interceptor.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { layoutReducer } from './store/layout.store';
import { EffectsModule } from '@ngrx/effects';


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
    EffectsModule.forRoot([])


  StoreModule.forRoot({}), // for no global state, use an empty object,  {}.
  StoreModule.forFeature(layoutFeatureKey, layoutReducer),
  StoreDevtoolsModule.instrument({
    name: 'Nexul Academy - Simple CRM'
  })
  ],

  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    AppIconsService],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(iconService: AppIconsService) {}
}






