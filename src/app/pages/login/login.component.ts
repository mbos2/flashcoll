import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) {
    console.log(this.router.url);
    const nav = document.getElementById("navBar");
    const switchButton = document.getElementsByClassName('.cl-auth-form-switch');
    console.log(switchButton);
    // @ts-ignore
    nav.style.display = 'none';
  }

  ngOnInit(): void {
  }

  selectedIndex:number=0;
  showSignUp(){
    this.selectedIndex=1;
  }
  showSignIn(){
    this.selectedIndex=0;
  }

}
