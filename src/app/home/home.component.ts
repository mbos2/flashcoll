import { Component, OnInit } from '@angular/core';
import { ClerkService } from '../service/clerk';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  constructor(private clerkClient: ClerkService) {}
  ngOnInit(): void {
    console.log(this.clerkClient.clerkObject); //this returns undefined // TODO: to remove this comment
  }  
}
