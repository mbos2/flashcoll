import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.sass']
})
export class LoaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let wrapper = document.querySelector('.loader-wrapper');
    wrapper?.classList.add('.is-active');
  }

}
