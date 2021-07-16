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
      setTimeout( () => {
        this.createSocialsSettingsButton();
      },1);
      // let buttons = document.querySelector('.cl-component.cl-user-button-popup')?.children[1].children[0];
      // console.log(buttons);
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

  createSocialsSettingsButton() {
    let buttons = document.querySelector('.cl-component.cl-user-button-popup')?.children[1].children[0];   
    console.log(buttons?.children[0]);
    buttons?.children[0].classList.add('order-1');
    buttons?.children[1].classList.add('order-3');
    let newButton = document.createElement('a');
    newButton.id = 'socials';
    newButton.classList.add('_3bDedxNjPBtkn-BuP2nhY2','_11ZVSe2vGmcrGqZUhdWgXB', '_3roVnjNLYXA8oyjSMR_tyO', '_2eZklRe9WnyPiLM2T0R6XG', 'cl-accounts-manager-button', '_1WVBqxUEPjqhMKyLv7b558', 'order-2');
    newButton.style.display = 'flex';
    newButton.innerHTML = 'Manage socials';
    newButton.href = "socials";
    buttons?.appendChild(newButton)
  }
}
