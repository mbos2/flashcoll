import {Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ClerkService} from "../../services/clerk.service";
import {filter, map, tap} from "rxjs/operators";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.sass'],
  providers: [{provide: Window, useValue: window}],
})
export class LandingComponent implements OnInit {
  @ViewChild('signUpContainer') private signUpContainer: ElementRef<HTMLDivElement> | undefined;

  public loggedIn = this.clerk.user$.pipe(map(u => !!u));

  constructor(private clerk: ClerkService) { }

  signOut() {
    this.clerk.signOut();
  }

  ngOnInit(): void {
    const targetDiv = document.getElementById("third");
    const btn = document.getElementById("toggle");
    btn!.onclick = function () {
      if (targetDiv!.style.display !== "none") {
        targetDiv!.style.display = "none";
      } else {
        targetDiv!.style.display = "block";
      }
    };
  }

}