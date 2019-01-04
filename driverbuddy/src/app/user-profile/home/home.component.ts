import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  onLogout(){
    // this.userService.deleteToken();
     this.router.navigate(['/login']);
   }
   onSignup(){
     this.router.navigate(['/signup']);
   }
   ondriver(){
    this.router.navigate(['/']);
  }
  oninsurance(){
    this.router.navigate(['/profile']);
  }
  onpolice(){
    this.router.navigate(['/']);
  }

}
