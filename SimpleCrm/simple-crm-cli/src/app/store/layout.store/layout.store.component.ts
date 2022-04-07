import { Component } from '@angular/core';
import { createReducer, on, Action, createAction } from '@ngrx/store';

@Component({
  selector: 'crm-layout.store',
  templateUrl: './layout.store.component.html',
  styleUrls: ['./layout.store.component.scss']
})
export interface LayoutState {
  showSidenav: boolean;
}

const initialState: LayoutState = {
  showSidenav: false
};

export const toggleSidenav = createAction('[Layout] Toggle Sidenav');
      export const openSidenav = createAction('[Layout] Open Sidenav');
      export const closeSidenav = createAction('[Layout] Close Sidenav');



      const rawLayoutReducer = createReducer(
        initialState,
        on(closeSidenav, state => ({...state, showSidenav: false })),
        on(openSidenav, state => ({...state, showSidenav: true })),
        on(toggleSidenav, state => ({...state, showSidenav: !state.showSidenav }))
      );

      /** Provide reducer in AOT-compilation happy way */
      export function layoutReducer(state: LayoutState, action: Action) {
        return rawLayoutReducer(state, action);
      }



