import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { constructor } from 'jasmine';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { LayoutState, selectShowSideNav, toggleSidenav } from './store/layout.store';
import { User, Role }

@Component({
  selector: 'crm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
  
})
export class AppComponent {
  title = 'Simple CRM';
  	  user: User;
  AuthenticationService: any;

      constructor(private store: Store<LayoutState>) { }
    //   constructor(private authenticationService: AuthenticationService) {
    //     this.authenticationService.user.subscribe(x => this.user = x);
    // }
      // constructor(private store: new Store<LayoutState>() {
      //   this.showSideNav$ = this.store.pipe(select(selectShowSideNav));
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
showSideNav$: new Observable<boolean>(); // <-- NEW

