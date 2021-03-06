import { Component, AfterViewInit } from '@angular/core';
import { ClerkService } from 'app/services/clerk.service';
import { HarperDbService } from 'app/services/harperdb.service';
import { FormGroup, FormControl } from '@angular/forms';
import { NotificationsEnum } from 'app/enums/notificationMessagesEnum';

@Component({
  selector: 'app-socials',
  templateUrl: './socials.component.html',
  styleUrls: ['./socials.component.sass']
})
export class SocialsComponent implements AfterViewInit {
  githubDisabled = true;
  successIndicator = 0;
  notificationMessage: any;
  subProfileForm = new FormGroup({
    id:  new FormControl(''), 
    email: new FormControl(''),
    facebookURL: new FormControl(''),
    twitterURL: new FormControl(''),
    instagramURL: new FormControl(''),
    githubProfileURL: new FormControl(''),
    linkedInURL: new FormControl(''),
    portfolioURL: new FormControl(''),
  });

  constructor(private clerk: ClerkService, private harperDbService: HarperDbService) { }

  ngAfterViewInit(): void {
    this.clerk.user$.subscribe(user => {
      this.harperDbService.getUserSubProfileByUserId(user!.id)
      .then(data => {
        const userData = data[0];
        this.subProfileForm.setValue({
          id: String(user!.id),
          email: String(userData.email),
          facebookURL: String(userData.facebookURL),
          twitterURL: String(userData.twitterURL),
          instagramURL: String(userData.instagramURL),
          githubProfileURL: String(userData.githubProfileURL),
          linkedInURL: String(userData.linkedInURL),
          portfolioURL: String(userData.portfolioURL)
        })
      })
    });
  }

  async onSubmit() {
    return await this.harperDbService.updateUserSubProfileData(this.subProfileForm.value)
      .then(data => {
        if (data.ok) {
          this.successIndicator = 1;
          this.notificationMessage = NotificationsEnum.profileUpdated;
          return;
        } else {
          this.successIndicator = 2;
          this.notificationMessage = NotificationsEnum.Error;
          return;
        }
      })
      .catch(() => {
        this.successIndicator = 2;
        this.notificationMessage = NotificationsEnum.Error;
      });
  }
}
