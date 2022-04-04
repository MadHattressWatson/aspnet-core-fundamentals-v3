import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';
import { SigninMicrosoftComponent } from './signin-microsoft/signin-microsoft.component';
import { SigninGoogleComponent } from './signin-google/signin-google.component';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    LoginComponent,
    SigninMicrosoftComponent,
    SigninGoogleComponent
  ],
  imports: [
    AccountRoutingModule,
    CommonModule,
    BrowserModule
  ]
})
export class AccountModule {}

