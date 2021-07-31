import { Component, OnInit } from '@angular/core';
import marked from 'marked';
const gh = require('parse-github-url');

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass'],  
})
export class IndexComponent implements OnInit {
  public markdownContent: string = '';

  ngOnInit(): void {
    this.postData().
      then(res => {
        this.markdownContent = marked(res);
      });
  }

  async postData() {
  // Default options are marked with *
    const githubUrl = gh('https://github.com/mbos2/demo-markdown/blob/main/demo2.md');
    const url = `https://api.github.com/repos/${githubUrl.owner}/${githubUrl.name}/contents/${githubUrl.filepath}`; // https://github.com/mbos2/flashcoll/blob/main/DESCRIPTION.md
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

