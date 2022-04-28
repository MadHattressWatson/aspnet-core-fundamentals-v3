import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';
import { SigninMicrosoftComponent } from './signin-microsoft/signin-microsoft.component';
import { SigninGoogleComponent } from './signin-google/signin-google.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    NotAuthorizedComponent,
    LoginComponent,
    SigninMicrosoftComponent,
    SigninGoogleComponent,
  ],

  imports: [
    ReactiveFormsModule,
    AccountRoutingModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
    MatIconModule,

  ]
})


export class AccountModule {}
