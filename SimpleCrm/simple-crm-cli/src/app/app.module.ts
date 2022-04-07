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

