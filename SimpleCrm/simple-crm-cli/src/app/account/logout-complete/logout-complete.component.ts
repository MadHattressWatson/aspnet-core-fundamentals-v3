import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'crm-logout-complete',
  templateUrl: './logout-complete.component.html',
  styleUrls: ['./logout-complete.component.scss']
})
export class LogoutCompleteComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


login(){
  this.router.navigate(['account', 'login']);
}

}
