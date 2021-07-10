import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import {ClerkService} from "../../services/clerk.service";

@Component({
  selector: 'clerk-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass']
})
export class SignInComponent implements AfterViewInit {
  @ViewChild('signInContainer', {static: false}) private signInContainer: ElementRef<HTMLDivElement> | undefined;

  constructor(private clerk: ClerkService) {
    let switchButton = document.body.querySelector('.cl-component'); // returns null
    console.log(switchButton);
  }

  ngAfterViewInit() {    
    this.clerk.user$.subscribe(user => {
      const el = this.signInContainer?.nativeElement;
      if (!el) {
        return;
      }

      if (!user) {
        this.clerk.mountSignIn(el)
        return;
      }

      this.clerk.unMountSignIn(el);
    })
  }
}
