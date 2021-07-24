import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ClerkService } from 'app/services/clerk.service';
import { HarperDbService } from 'app/services/harperdb.service';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.sass']
})
export class NewProjectComponent implements AfterViewInit {

  constructor(private clerk: ClerkService, private harperDbService: HarperDbService) { }
  ngAfterViewInit(): void {
    this.clerk.user$.subscribe(user => {
      
    });
  }

  ngOnInit(): void {
  }

}
