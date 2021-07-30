import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClerkService } from 'app/services/clerk.service';
import { HarperDbService } from 'app/services/harperdb.service';
import marked from 'marked';

const gh = require('parse-github-url');
const sharon = require('sharon');

@Component({
  selector: 'app-projectdetails',
  templateUrl: './projectdetails.component.html',
  styleUrls: ['./projectdetails.component.sass']
})

export class ProjectdetailsComponent implements OnInit, AfterViewInit {
  @ViewChild('deleteButton') private deleteButton: ElementRef<HTMLElement> | undefined;
  @ViewChild('closeModal') private closeModal: ElementRef<HTMLElement> | undefined;
  public markdownContent: string = '';
  id: any;
  userID: any;
  userProfile: any;
  userGithubUsername: any;
  projectGithubURL: any;
  projectFlashcollUrl: any;
  mailTo: any;
  $scope: any;
  socialShareLinks: any = {
    facebook: 'string',
    twitter: 'string',
    whatsapp: 'string',
    linkedin: 'string'
  }
  // title: string = "Flashcoll";
  // description: string = "Platform to feature your next github project and find collaborators"
  constructor(private route: ActivatedRoute, private harperDbService: HarperDbService, private clerk: ClerkService, private router: Router) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.projectFlashcollUrl = `https://www.flashcoll.com/project/${this.id}`;
    this.socialShareLinks = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${this.projectFlashcollUrl}`,
      twitter: `http://twitter.com/share?url=${this.projectFlashcollUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${this.projectFlashcollUrl}`,
      whatsapp: `https://web.whatsapp.com/send?text=${this.projectFlashcollUrl}`
    }
  }

  async ngOnInit(): Promise<void> {
    const shareDiv = document.querySelector('.shareon');
    shareDiv?.setAttribute('data-url', this.projectFlashcollUrl);
    this.postData().
      then(res => {
        this.markdownContent = marked(res);
      });

    this.userID = await this.getUserIdFromProjectData(this.id);
    await this.harperDbService.getUserSubProfileByGithubUsername(this.userGithubUsername)
      .then(result => {
        this.userProfile = result[0];
        this.mailTo = `mailto:${this.userProfile.email}`;
      })
  }
  
  fb(event: any) {
    this.$scope.href = sharon.facebook.href();
    let e = event;
    this.$scope.share = function (event: any) {
      event.preventDefault();
      sharon.facebook();
    };
  }

  ngAfterViewInit(): void {
    const shareDiv = document.querySelector('.shareon');
    shareDiv?.setAttribute('data-url', this.projectFlashcollUrl);
     // @ts-ignore
    this.deleteButton.nativeElement.classList.add('hide');
     // @ts-ignore
    const modal = document.querySelector('#myModal');
    this.deleteButton?.nativeElement.addEventListener('click', function () {
      modal?.classList.add('is-active');
    });
    this.closeModal?.nativeElement.addEventListener('click', function () {
      modal?.classList.remove('is-active');
    });

    this.clerk.user$.subscribe(user => {
      if (!user) {
        return;
      }
      this.harperDbService.getUserSubProfileByUserId(user!.id)
        .then(data => {
          return data[0]
        }).then(result => {
          if (this.userGithubUsername === result.githubUsername) {
            // @ts-ignore
            this.deleteButton.nativeElement.classList.remove('hide');
          } else {
            // @ts-ignore
            this.deleteButton.nativeElement.classList.add('hide')
          }
        })
    });
  }

  async postData() {
  // Default options are marked with *
    await this.harperDbService.getProjectDetails(this.id)    
      .then(result => {
        return result.json()
      }).then(data => {
        this.projectGithubURL = data[0].githubRepoURL;
        this.userGithubUsername = data[0].githubUsername
      });
    const githubUrl = gh(this.projectGithubURL);
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

  deleteProject() {
    this.harperDbService.deleteProject(this.id)
    this.router.navigate([`/profile/${this.userGithubUsername}`]); 
  }
}