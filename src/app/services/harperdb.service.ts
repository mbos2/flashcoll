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

  async runSQLOnHarperDB(sqlQuery: string) {
    let options = this.harperRequestOptions(sqlQuery);
    return await fetch(this.harpedAPI, options);
  }

  async generateUserSubprofileIfNotExist(userId: string) {
    let userData: any;
    const user = await fetch(`https://flashcoll-backend.glitch.me/clerk/user/${userId}`)
      .then(data => {
        let json = data.json();
        json.then(res => {
          userData = res;
        })
      })
    
    await this.runSQLOnHarperDB(`SELECT * FROM flashcoll.user_profile where id = "${userId}"`)
      .then(data => {
        return data.json();
      })
      .then(result => {
        if (result.length < 1) {
          // Create user here!
          const sqlQuery = `INSERT INTO flashcoll.user_profile (id, firstName, lastName, email, githubID, userImageURL, facebookURL, twitterURL, instagramURL) VALUE ("${userData.id}", "${userData.first_name}", "${userData.last_name}", "${''}", "${userData.external_accounts[0].provider_user_id}", "${userData.profile_image_url}", "${''}", "${''}", "${''}")`;
          this.runSQLOnHarperDB(sqlQuery);
        }
      })
  }
}
