import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ClerkService} from "../../services/clerk.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  providers: [{provide: Window, useValue: window}],
})
export class HomeComponent implements OnInit {
  @ViewChild('signInContainer') private signInContainer: ElementRef<HTMLDivElement> | undefined;
  @ViewChild('signUpContainer') private signUpContainer: ElementRef<HTMLDivElement> | undefined;

  constructor(private clerk: ClerkService) { }

  ngAfterViewInit() {
    // "Make sure to call these in/after `ngAfterViewInit`, otherwise the @ViewChild props will be undefined"
    if (this.signInContainer) {
      this.clerk.mountSignIn(this.signInContainer.nativeElement)
    }

    if (this.signUpContainer) {
      this.clerk.mountSignUp(this.signUpContainer.nativeElement)
    }
  }

  ngOnInit(): void {}
}
