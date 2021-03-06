import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ClerkService } from 'app/services/clerk.service';
import { HarperDbService } from 'app/services/harperdb.service';
// import BulmaTagsInput from '@creativebulma/bulma-tagsinput';
import { GithubService } from 'app/services/github.service';
import { NotificationsEnum } from 'app/enums/notificationMessagesEnum';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

export interface GithubRepoData {
  name: string,
  description: string,
  html_url: string,
  githubUsername: string,
}

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.sass']
})
export class NewProjectComponent implements AfterViewInit {
  // @ViewChild('tags', { static: false }) private tags: ElementRef<HTMLInputElement> | undefined;
  @ViewChild('form', { static: false }) private form: ElementRef<HTMLElement> | undefined | null;
  isDisabled = true;
  successIndicator = 0;
  notificationMessage: any;
  userRepositories: Array<GithubRepoData> = [];
  githubUsername: any;
  projectData = new FormGroup({
    id: new FormControl(''),
    userID: new FormControl(''),
    githubUsername: new FormControl(''),
    projectTitle: new FormControl(''),
    shortDescription: new FormControl(''),
    githubRepoURL: new FormControl(''),
    // tags: new FormControl(''),
  });

  constructor(private clerk: ClerkService, private harperDbService: HarperDbService, private githubService: GithubService, private router: Router) {
    // BulmaTagsInput.attach();
  }
  ngAfterViewInit(): void {
    this.clerk.user$.subscribe(user => {
      this.projectData.patchValue({
        userID: user?.id       
      })
      this.githubService.getUserRepositories(user?.data.external_accounts[0].provider_user_id)
        .then(value => {
          return value.json()
      })
        .then(repos => {
          console.log(repos);
          repos.forEach((repo: any) => {
            this.githubUsername = repo.owner.login;
            this.userRepositories.push({
              name: repo.name,
              description: repo.description,
              html_url: repo.html_url,
              githubUsername: this.githubUsername
            })
          });
        })
    });

    // const form = this.form?.nativeElement;
    // form?.addEventListener('keypress', function (e) {
    //   console.log(e.key)
    //   if (e.key == "Enter")
    //     {
    //     e.preventDefault();        
    //     }
    // })
  }

  async createProject() {    
    // const tags = this.tags?.nativeElement.value;
    // const arrayOfTags = tags?.split(',');
    // this.projectData.patchValue({
    //   tags: arrayOfTags
    // })

    return await this.harperDbService.createNewProject(this.projectData.value)
      .then(data => {
        console.log(data.body);
        if (data.ok) {          
          this.successIndicator = 1;
          this.notificationMessage = NotificationsEnum.ProjectCreated;
          setTimeout(() => {
            this.successIndicator = 0
            this.router.navigate([`/project/${this.projectData.value.id}`]); 
          },2000)
        } else {
          this.successIndicator = 2;
          this.notificationMessage = NotificationsEnum.Error;
          setTimeout(() => {
            this.successIndicator = 0
          },5000)
        }
      });
  }

  async changeRepo(e: any) {
    let repository: any;
    this.userRepositories.find(function (repo) {      
      if (repo.name == e.target.value)
        repository = repo;
    });
    return this.projectData.patchValue({
      id: uuidv4(),
      projectTitle: repository.name,
      shortDescription: repository.description,
      githubRepoURL: repository.html_url,
      githubUsername: repository.githubUsername
    })
  }  
}
