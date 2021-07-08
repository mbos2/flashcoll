import { Component, OnInit, Inject, Injectable, } from '@angular/core';
import { ClerkService } from './service/clerk';
@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-root',  
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  ngOnInit(): void {

  }

}

