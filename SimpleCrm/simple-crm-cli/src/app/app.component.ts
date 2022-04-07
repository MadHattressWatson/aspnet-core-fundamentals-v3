import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthenticationService } from './authentication.service';
import { LayoutState, toggleSidenav } from './store/layout.store/layout.store.component';
import { User, Role }

@Component({
  selector: 'crm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Simple CRM';
  	  user: User;
  authenticationService: any;

      constructor(private store: Store<LayoutState>) { }
    //   constructor(private authenticationService: AuthenticationService) {
    //     this.authenticationService.user.subscribe(x => this.user = x);
    // }

    get isAdmin() {
        return this.user && this.user.role === Role.Admin;
    }

    logout() {
        this.authenticationService.logout();
    }
}
sideNavToggle() {
  this.store.dispatch(toggleSidenav());
}
