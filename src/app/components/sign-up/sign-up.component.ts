import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import { ClerkService } from "../../services/clerk.service";

@Component({
  selector: 'clerk-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass']
})
export class SignUpComponent implements AfterViewInit {
  @ViewChild('signUpContainer', { static: false }) private signUpContainer: ElementRef<HTMLDivElement> | undefined;

  a: any;
  constructor(private clerk: ClerkService) {
    this.a = document.getElementById("particles-js");
    console.log(this.a);
  }

  ngAfterViewInit() {
    this.clerk.user$.subscribe(user => {
      const el = this.signUpContainer?.nativeElement;
      if(!el) {
        return;
      }

      if(!user) {
        this.clerk.mountSignUp(el)
        return;
      }

      this.clerk.unmountSignUp(el);
    })
  }

}
