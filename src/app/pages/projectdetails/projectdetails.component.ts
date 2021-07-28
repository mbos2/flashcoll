import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HarperDbService } from 'app/services/harperdb.service';
import marked from 'marked';
const gh = require('parse-github-url');


@Component({
  selector: 'app-projectdetails',
  templateUrl: './projectdetails.component.html',
  styleUrls: ['./projectdetails.component.sass']
})

export class ProjectdetailsComponent implements OnInit {
  public markdownContent: string = '';
  id: any;
  userID: any;
  userProfile: any;
  projectGithubURL: any;
  projectFlashcollUrl: any;
  title: string = "Flashcoll";
  description: string = "Platform to feature your next github project and find collaborators"
  constructor(private route: ActivatedRoute, private harperDbService: HarperDbService) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.projectFlashcollUrl = `https://www.flashcoll.com/project/${this.id}`;
  }

  async ngOnInit(): Promise<void> {
    this.postData().
      then(res => {
        this.markdownContent = marked(res);
      });

    this.userID = await this.getUserIdFromProjectData(this.id);
    await this.harperDbService.getUserSubProfileByUserId(this.userID)
      .then(result => {
        this.userProfile = result[0];
      });
   }

  async postData() {
  // Default options are marked with *
    await this.harperDbService.getProjectDetails(this.id)    
      .then(result => {
        return result.json()
      }).then(data => {
        this.projectGithubURL = data[0].githubRepoURL;
      });
    const githubUrl = gh(this.projectGithubURL);
    console.log(gh('https://github.com/mbos2/flashcoll/blob/main/DESCRIPTION.md'))
    let url = `https://api.github.com/repos/${githubUrl.owner}/${githubUrl.name}/contents/README.md`; // https://github.com/mbos2/flashcoll/blob/main/DESCRIPTION.md
    const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/vnd.github.v3.raw'
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      // body data type must match "Content-Type" header
    });
    return response.text();
  }

  private async getUserIdFromProjectData(projectId: string) {
    let userId;
    await this.harperDbService.getProjectDetails(this.id)
      .then(result => {
        return result.json()
      }).then(data => {
        userId = data[0].userID;
      });
    return userId;
  } 

}