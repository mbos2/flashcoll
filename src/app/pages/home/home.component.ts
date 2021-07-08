import { Component, OnInit } from '@angular/core';
import { ClerkService } from '@service/clerk-service/clerk';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  providers: [{ provide: Window, useValue: window }],
})
export class HomeComponent implements OnInit {
  loginContainer: any;
  constructor() {
     //@ts-ignore
    console.log(window);
   }

  ngOnInit(): void { 
    let signin = document.getElementById('sign-in');
    // let signup = document.getElementById('sign-up');
     //@ts-ignore
    console.log(signin, window.Clerk);
     //@ts-ignore
    window.Clerk.mountSignIn(signin);
      //@ts-ignore
    // window.Clerk.mountSignUp(signup);
  }
}
