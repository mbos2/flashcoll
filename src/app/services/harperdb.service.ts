import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
@Injectable()
export class HarperDbService {

 
  private harpedAPI = environment.HARPERDB_API;
  myHeaders = new Headers();
  constructor() {   
    this.myHeaders.append("Content-Type", "application/json");
    this.myHeaders.append("Authorization", "Basic Zmxhc2hjb2xsX2FkbWluOjE2MTE5Mm1N"); 
  }

  harperRequestOptions(sqlQuery: string): RequestInit | undefined {
    return {
      method: 'POST',
      headers: this.myHeaders,
      body: this.harperPrepareRawData(sqlQuery),
      // redirect: 'follow'
    }   
  }

  harperPrepareRawData(sqlQuery: string) {
    return JSON.stringify({
        "operation": "sql",
        "sql": sqlQuery // SELECT * FROM schema.table
    });
  }

  async getData(sqlQuery: string) {
    let options = this.harperRequestOptions(sqlQuery);
    console.log(options);
    return await fetch(this.harpedAPI, options);
  }
  
  
  // async testHarperDbData() {
  //   let sqlQuery = `SELECT * FROM flashcoll_schema.subprofile`;
  //   let request = await this.harperDbService.getData(sqlQuery)
  //     .then(response => response.text())
  //     // @ts-ignore
  //     .then(result => console.log(result))
  //     .catch(error => console.log('error', error));
  // }

  // async testHarperDbDataByUserSubprofileId() {
  //   let sqlQuery = `SELECT * FROM flashcoll_schema.subprofile WHERE id = '${this.userId}'`; // let sqlQuery = "SELECT * FROM flashcoll_schema.subprofile WHERE id = 'user_1vM31eHUtbuGEueo3aCoZdBwQ9o'";
  //   let request = await this.harperDbService.getData(sqlQuery)
  //     .then(response => response.text())
  //     // @ts-ignore
  //     .then(result => console.log(result))
  //     .catch(error => console.log('error', error));
  // }

  // async testHarperArticleByUserId() {

  //   let sqlQuery = `SELECT * FROM flashcoll_schema.subprofile WHERE id = '${this.userId}'`; // let sqlQuery = "SELECT * FROM flashcoll_schema.subprofile WHERE id = 'user_1vM31eHUtbuGEueo3aCoZdBwQ9o'";
  //   let sql = `SELECT title FROM flashcoll_schema.article where search_json('$[subId=\"{${this.userId}\"]', flashcoll_schema.subprofile)`;

  //   let s = "SELECT subprofile.subId, article.id, article.userId, article.title FROM flashcoll_schema.subprofile INNER JOIN flashcoll_schema.article ON subprofile.subId=article.userId WHERE article.userId='user_1vMYWOOXCg5UhO8pZdGlvFfssMo'";
    
  //   let request = await this.harperDbService.getData(s)
  //     .then(response => response.text())
  //     // @ts-ignore
  //     .then(result => console.log(result))
  //     .catch(error => console.log('error', error));
  // }

}
