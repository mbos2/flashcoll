import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ClerkService } from 'app/services/clerk.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.sass']
})
export class NavigationComponent implements OnInit {
  @ViewChild('userActionButton', {static: false}) private userActionContainer: ElementRef<HTMLDivElement> | undefined;

  loginContainer: any;
  constructor(private clerk: ClerkService, private router: Router) {
    console.log(this.router.url);
  }

  ngOnInit(): void {     
    this.clerk.user$.subscribe(user => {
      console.log(user);
      const el = this.userActionContainer?.nativeElement;
      if (!el) {
        return;
      }

      if (!user) {
        this.clerk.unMountUserButton(el)
        return;
      }

      this.clerk.mountUserButton(el);
    })
  }
}
