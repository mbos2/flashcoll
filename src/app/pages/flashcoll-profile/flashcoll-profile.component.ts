import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HarperDbService } from 'app/services/harperdb.service';

@Component({
  selector: 'app-flashcoll-profile',
  templateUrl: './flashcoll-profile.component.html',
  styleUrls: ['./flashcoll-profile.component.sass']
})

export class FlashcollProfileComponent implements OnInit {
  @ViewChildren('anchor') private anchors: QueryList<ElementRef> | undefined;
  public markdownContent = '';
  username: any;
  userID: any;
  userProfile: any;
  mailTo: any;
  projects: any;

  constructor(private route: ActivatedRoute, private harperDbService: HarperDbService) {
    this.username = this.route.snapshot.paramMap.get('username');
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
      })
    this.hideEmptyNetworkAnchors();
  }
  
  hideEmptyNetworkAnchors() {
    const anchors = this.anchors?.toArray();
    anchors?.forEach(anchor => {
      if (anchor.nativeElement.getAttribute('href') == "" || anchor.nativeElement.getAttribute('href') == null) {
        return anchor.nativeElement.style.display = 'none';
      }
      return;
    })
  }
}