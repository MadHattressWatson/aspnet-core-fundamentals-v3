import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'crm-logout-complete',
  templateUrl: './logout-complete.component.html',
  styleUrls: ['./logout-complete.component.scss']
})
export class LogoutCompleteComponent {

  constructor(private router: Router) { }

login(){
  this.router.navigate(['account', 'login']);
}

}
