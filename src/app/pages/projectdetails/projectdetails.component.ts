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
  private md: any;
  private showdown: any;
  id: any;
  constructor(private route: ActivatedRoute, private harperDbService: HarperDbService) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.postData().
      then(res => {
        this.markdownContent = marked(res);
      });
  }

  async postData() {
  // Default options are marked with *
    let projectGithubURL;
    await this.harperDbService.getProjectDetails(this.id)
      .then(result => {
        return result.json()
      }).then(data => {
        projectGithubURL = data[0].githubRepoURL;
      });
    console.log(projectGithubURL)
    const githubUrl = gh(projectGithubURL);
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

}