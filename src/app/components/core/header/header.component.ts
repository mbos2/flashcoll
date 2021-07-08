import { Component, OnInit } from '@angular/core';
import { ClerkService } from '@service/clerk-service/clerk';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  constructor(clerkService: ClerkService) {
    // console.log(clerkService.IsClerkUserActive);
  }

  ngOnInit(): void {
  }

}
