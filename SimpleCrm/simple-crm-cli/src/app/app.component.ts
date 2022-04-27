import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LayoutState, selectShowSideNav, toggleSidenav } from './customer/store/layout.store';


@Component({
  selector: 'crm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']

})
export class AppComponent {
  showSideNav$: Observable<boolean>;

  constructor(private store: Store<LayoutState>) {
        this.showSideNav$ = this.store.pipe(select(selectShowSideNav));
      }
  sideNavToggle() {
    this.store.dispatch(toggleSidenav());
  }
};







