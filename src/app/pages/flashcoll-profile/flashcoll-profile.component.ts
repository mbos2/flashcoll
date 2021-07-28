import { Component, OnInit } from '@angular/core';
import { HarperDbService } from 'app/services/harperdb.service';

@Component({
  selector: 'app-flashcoll-profile',
  templateUrl: './flashcoll-profile.component.html',
  styleUrls: ['./flashcoll-profile.component.sass']
})
export class FlashcollProfileComponent implements OnInit {

  constructor(private harperDbService: HarperDbService) { }

  ngOnInit(): void {
  //   await this.harperDbService.getUserProfileFull(this.userID)
  //     .then(result => {
  //       return {
  //         userProfile: result.profile,
  //         userProjects: result.projects
  //       }
  //     })
  //     .then(data => {
  //       this.userProfile = data.userProfile
  //       return data.userProjects
  //     })
  //     .then(projects => {
  //       console.log(projects)
  //     })
  }

}
