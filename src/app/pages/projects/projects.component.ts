import { Component, OnInit } from '@angular/core';
import { ClerkService } from 'app/services/clerk.service';
import { HarperDbService } from 'app/services/harperdb.service';
import { NgxMasonryOptions } from 'ngx-masonry';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.sass']
})
export class ProjectsComponent implements OnInit {

  projects: any;
  public myOptions: NgxMasonryOptions = {
    gutter: 0,
  };
 
  constructor(private clerk: ClerkService, private harperDbService: HarperDbService) { }

  async ngOnInit(): Promise<void> {
    await this.harperDbService.getAllProjects()
      .then(result => {
        return result.json();
      })
      .then(data => {
        this.projects = data;
      })
  }

}
