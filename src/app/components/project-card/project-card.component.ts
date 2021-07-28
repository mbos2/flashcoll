import { Component, Input, OnInit } from '@angular/core';
import { User } from 'app/interfaces/user.interface';
import { HarperDbService } from 'app/services/harperdb.service';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.sass']
})
export class ProjectCardComponent implements OnInit {

  @Input() project: any;
  tags: String[] = [];
  user: User | undefined;
  ifProjectHasTags = true;
  noDescriptionClass: any;
  constructor(private harperDbService: HarperDbService) {
    
   }

  async ngOnInit(): Promise<void> {
    if (this.project.projectShortDescription === null || this.project.projectShortDescription === undefined) {
      this.project.projectShortDescription = 'No short description at this time. But click on Read More to find out more about this project :)';
      this.noDescriptionClass = 'no-description';
    }
    await this.harperDbService.getUserSubProfileByUserId(this.project.userID)
      .then(result => {
        if (this.project.tags == "" || this.project.tags == null || this.project.tags == undefined) {
          this.ifProjectHasTags = false;
        }
        const ress = result[0];
        this.user = {
          id: ress.id,
          firstName: ress.firstName,
          lastName: ress.lastName,
          userImageURL: ress.userImageURL
        }
      })
    this.project.tags.split(',').forEach((tag: any) => {
      this.tags.push(` #${tag}`);
    });
    this.project.tags = this.tags.join(' ');
  }

}
