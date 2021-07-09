import {Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ClerkService} from "../../services/clerk.service";
import {filter, map, tap} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  providers: [{provide: Window, useValue: window}],
})
export class HomeComponent implements OnInit {
  @ViewChild('signUpContainer') private signUpContainer: ElementRef<HTMLDivElement> | undefined;

  public loggedIn = this.clerk.user$.pipe(map(u => !!u));

  constructor(private clerk: ClerkService) { }

  signOut() {
    this.clerk.signOut();
  }

  ngOnInit(): void { }
}
