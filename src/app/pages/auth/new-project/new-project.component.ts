import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ClerkService } from 'app/services/clerk.service';
import { HarperDbService } from 'app/services/harperdb.service';
import BulmaTagsInput from '@creativebulma/bulma-tagsinput';
import { GithubService } from 'app/services/github.service';

export interface GithubRepoData {
  name: string,
  description: string,
  html_url: string
}

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.sass']
})
export class NewProjectComponent implements AfterViewInit {
  isDisabled = true;
  @ViewChild('tags', { static: false }) private tags: ElementRef<HTMLInputElement> | undefined;
  userRepositories: Array<GithubRepoData> = [];
  projectData = new FormGroup({
    userID:  new FormControl(''),
    title: new FormControl(''),
    shortDescription: new FormControl(''),
    githubRepo: new FormControl(''),
    tags: new FormControl(''),
  });

  constructor(private clerk: ClerkService, private harperDbService: HarperDbService, private githubService: GithubService) {
    BulmaTagsInput.attach();
  }
  ngAfterViewInit(): void {
    this.clerk.user$.subscribe(user => {
      console.log(user);
       console.log(user?.data.external_accounts[0].provider_user_id)
      const repos = this.githubService.getUserRepositories(user?.data.external_accounts[0].provider_user_id)
      .then(value => {
        return value.json()
      })
        .then(repos => {
          console.log(repos)
          repos.forEach((repo: GithubRepoData) => {
            this.userRepositories.push({
              name: repo.name,
              description: repo.description,
              html_url: repo.html_url
            })
          });
        })
      console.log(this.userRepositories);
    });
  }

  ngOnInit(): void {
  }

  async createProject() {
    const tags = this.tags?.nativeElement.value;
    console.log(tags?.split(','));
  }

}
