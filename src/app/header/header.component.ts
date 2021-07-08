import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  testLabel() {
    let label = document.querySelector('_2c8hnvnVYOPx6EA7w5iOQs');
    console.log(label);
  }

}
