import { Component, OnInit } from '@angular/core';
import showdown from 'showdown';
import hljs from 'highlight.js';
// import marked from 'marked';
import MarkdownIt from 'markdown-it';
import marked from 'marked';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass'],  
})
export class IndexComponent implements OnInit {
  public markdownContent: string = '';
  private md: any;
  private showdown: any;
  constructor() {
  }

  ngOnInit(): void {
    this.postData('mbos2', 'demo-markdown', 'demo2').
      then(res => {
        this.markdownContent = marked(res);
      });
  }

  async postData(githubUsername: string, githubRepository: string, mdFileName: string) {
  // Default options are marked with *
    let url = `https://api.github.com/repos/${githubUsername}/${githubRepository}/contents/${mdFileName}.md`;
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

}
