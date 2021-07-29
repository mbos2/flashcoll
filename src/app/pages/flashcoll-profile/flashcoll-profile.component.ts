import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute,  Router } from '@angular/router';
import { ClerkService } from 'app/services/clerk.service';
import { HarperDbService } from 'app/services/harperdb.service';

@Component({
  selector: 'app-flashcoll-profile',
  templateUrl: './flashcoll-profile.component.html',
  styleUrls: ['./flashcoll-profile.component.sass']
})

export class FlashcollProfileComponent implements OnInit {
  @ViewChildren('anchor') private anchors: QueryList<ElementRef> | undefined;
  public markdownContent: string = '';
  username: any;
  userID: any;
  userProfile: any;
  mailTo: any;
  projects: any;

  constructor(private route: ActivatedRoute, private harperDbService: HarperDbService) {
    this.username = this.route.snapshot.paramMap.get('username');
    console.log(this.username)
    console.log(this.route.url)
  }

  async ngOnInit(): Promise<void> {    
    await this.harperDbService.getUserSubProfileByGithubUsername(this.username)
      .then(result => {
        this.userProfile = result[0];
        this.mailTo = `mailto:${this.userProfile?.email}`;
      });
    
    await this.harperDbService.getAllUserProjectsByGithubUsername(this.username)
      .then(result => {
        return result.json();
      })
      .then(data => {
        this.projects = data;
        console.log(data)
      })
    this.hide();
  }
  
  hide() {
    const anchors = this.anchors?.toArray();
    anchors?.forEach(anchor => {
      if (anchor.nativeElement.getAttribute('href') == "" || anchor.nativeElement.getAttribute('href') == null) {
        anchor.nativeElement.style.display = 'none';
      }
    })
  }
}