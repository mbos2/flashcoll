import { AfterViewInit, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { ClerkService } from 'app/services/clerk.service';
import { HarperDbService } from 'app/services/harperdb.service';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.sass']
})
export class NavigationComponent implements AfterViewInit, OnInit {
  @ViewChild('userAction', { static: false }) private userAction: ElementRef<HTMLDivElement> | undefined;
  @ViewChild('authButtons', { static: false }) private authButtons: ElementRef<HTMLDivElement> | undefined;
  @ViewChild('loggedInActions', {static: false}) private loggedInActions: ElementRef<HTMLDivElement> | undefined;
  harperDbService: HarperDbService;
  userName: string | null | undefined;
  constructor(private clerk: ClerkService, private router: Router, _harperDbService: HarperDbService) {

    console.log(window);
    this.harperDbService = _harperDbService;
  }
  ngOnInit(): void {
    document.addEventListener('DOMContentLoaded', function () {
    var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
      if ($navbarBurgers.length > 0) {
        $navbarBurgers.forEach(function ($el) {
          $el.addEventListener('click', function () {
            var target = $el.dataset.target;
            var $target = document.getElementById(target);
            $el.classList.toggle('is-active');
            // @ts-ignore
            $target.classList.toggle('is-active');
          });
        });
      }
    });
    let image = document.querySelectorAll('.cl-component.cl-user-button .cl-user-button-trigger');
    console.log(image);
  }

  ngAfterViewInit(): void {
    this.clerk.user$.subscribe(user => {
      const authButtons = this.authButtons?.nativeElement;
      const loggedInActions = this.loggedInActions?.nativeElement;
      const el = this.userAction?.nativeElement;
      if (!el) {
        console.log('Can not fetch native element for user action!');
        return;
      }

      if (!user) {
        this.clerk.unMountUserButton(el)
        // @ts-ignore
        authButtons!.style.display = 'flex';
        loggedInActions!.style.display = 'none';
        return;
      }
      // @ts-ignore
      // authButtons!.style.display = 'none';
      loggedInActions!.style.display = 'flex';
      this.clerk.mountUserButton(el);
      this.userName = user.firstName;
      setTimeout(() => {
        // Appending new button to user action because component loads faster than user action button can fetch all elements on component init
        // Delay of 1ms is needed to fetch the rest of user action elements so those could be targeted with javascript
        this.createSocialsSettingsButton();
      }, 1);
    }); // End of user subscription
  }

  createSocialsSettingsButton() {
    let buttons = document.querySelector('.cl-component.cl-user-button-popup')?.children[1].children[0];
    buttons?.children[0].classList.add('order-1');
    buttons?.children[1].classList.add('order-3');

    let newButton = document.createElement('a');
    newButton.id = 'socials';
    newButton.classList.add('_3bDedxNjPBtkn-BuP2nhY2','_11ZVSe2vGmcrGqZUhdWgXB', '_3roVnjNLYXA8oyjSMR_tyO', '_2eZklRe9WnyPiLM2T0R6XG', 'cl-accounts-manager-button', '_1WVBqxUEPjqhMKyLv7b558', 'order-2');
    newButton.style.display = 'flex';
    newButton.innerHTML = 'Manage socials';
    newButton.href = "socials";

    newButton.appendChild(this.createSvg());
    buttons?.appendChild(newButton)
  }

  createSvg() {
    let svgImage = document.createElement('img');
    svgImage.src = 'assets/images/socials-icon.svg';
    svgImage.style.width = '2rem';
    svgImage.style.height = '2rem';
    svgImage.style.order = '-1';
    return svgImage;
  }
}
