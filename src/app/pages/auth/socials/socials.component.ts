import { Component, AfterViewInit } from '@angular/core';
import { ClerkService } from 'app/services/clerk.service';
import { HarperDbService } from 'app/services/harperdb.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-socials',
  templateUrl: './socials.component.html',
  styleUrls: ['./socials.component.sass']
})
export class SocialsComponent implements AfterViewInit {
  githubDisabled = true;
  subProfileForm = new FormGroup({
    email: new FormControl('hello'),
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
          email: userData.email,
          facebookURL: userData.facebookURL,
          twitterURL: userData.twitterURL,
          instagramURL: userData.instagramURL,
          githubProfileURL: userData.githubProfileURL,
          linkedInURL: userData.linkedInURL,
          portfolioURL: userData.portfolioURL
        })
      })
    });
  }

  onSubmit() {};

}
