import { AfterViewInit } from '@angular/core';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ClerkService } from 'app/services/clerk.service';
import { HarperDbService } from 'app/services/harperdb.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.sass']
})
export class NavigationComponent implements AfterViewInit {
  @ViewChild('userAction', {static: false}) private userActionContainer: ElementRef<HTMLDivElement> | undefined;
  harperDbService: HarperDbService;
  loginContainer: any;
  userId: any;
  userIsLoggedIn: Boolean = false;
  constructor(private clerk: ClerkService, private router: Router, _harperDbService: HarperDbService) {
    console.log(window);
    this.harperDbService = _harperDbService;
  }

  ngAfterViewInit(): void {     
    this.clerk.user$.subscribe(user => {
      this.userId = String(user?.id);     
      const el = this.userActionContainer?.nativeElement;      
      if (!el) {
        console.log('Can not fetch native element for user action!');
        return;
      }

      if (!user) {
        this.clerk.unMountUserButton(el)
        this.userIsLoggedIn = false;
        return;
      }

      this.clerk.mountUserButton(el);
      this.userIsLoggedIn = true;
    })
  }

  async testHarperDbData() {
    let sqlQuery = `SELECT * FROM flashcoll_schema.subprofile`;
    let request = await this.harperDbService.getData(sqlQuery)
      .then(response => response.text())
      // @ts-ignore
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  async testHarperDbDataByUserSubprofileId() {
    let sqlQuery = `SELECT * FROM flashcoll_schema.subprofile WHERE id = '${this.userId}'`; // let sqlQuery = "SELECT * FROM flashcoll_schema.subprofile WHERE id = 'user_1vM31eHUtbuGEueo3aCoZdBwQ9o'";
    let request = await this.harperDbService.getData(sqlQuery)
      .then(response => response.text())
      // @ts-ignore
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

}
