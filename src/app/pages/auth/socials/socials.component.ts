import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ClerkService } from 'app/services/clerk.service';
import { HarperDbService } from 'app/services/harperdb.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-socials',
  templateUrl: './socials.component.html',
  styleUrls: ['./socials.component.sass']
})
export class SocialsComponent implements OnInit, AfterViewInit {
  subProfileForm = new FormGroup({
    email: new FormControl(''),
    facebookURL: new FormControl(''),
    twitterURL: new FormControl(''),
    instagramURL: new FormControl(''),
  });
  constructor(private clerk: ClerkService, private harperDbService: HarperDbService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.clerk.user$.subscribe(user => {
      this.harperDbService.getUserSubProfileByUserId(user!.id)
        .then(result => {
          console.log(result[0]);
        })
    });
  }

}
