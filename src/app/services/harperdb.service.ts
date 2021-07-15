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
    return await fetch(this.harpedAPI, options);
  }  

}
