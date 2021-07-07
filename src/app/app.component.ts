import { Component, OnInit, Inject, Injectable, } from '@angular/core';
import { ClerkService } from './service/clerk';
@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-root',
  providers: [{ provide: Window, useValue: window } ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent{

}

