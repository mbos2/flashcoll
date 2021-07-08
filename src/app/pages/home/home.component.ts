import { Component, OnInit } from '@angular/core';
import { ClerkService } from '@service/clerk-service/clerk';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  providers: [{ provide: Window, useValue: window } ],
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    console.log(window);
  }  
}
