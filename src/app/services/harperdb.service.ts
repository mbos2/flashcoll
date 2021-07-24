import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
@Injectable()
export class HarperDbService {
 
  private harpedAPI = environment.HARPERDB_API;
  myHeaders = new Headers();
  userData: any;
  constructor() {
    this.myHeaders.append("Content-Type", "application/json");
    this.myHeaders.append("Authorization", "Basic Zmxhc2hjb2xsX2FkbWluOjE2MTE5Mm1N");
  }

  //#region HarperDbConfig

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
      "sql": sqlQuery
    });
  }

  private async runSQLOnHarperDB(sqlQuery: string) {
    let options = this.harperRequestOptions(sqlQuery);
    return await fetch(this.harpedAPI, options);
  }

  //#endregion
  
  //#region HarperDbMethods

  async generateUserSubprofileIfNotExist(userId: string) {
    let userdata: any;
    await fetch(`https://flashcoll-backend.glitch.me/clerk/user/${userId}`)
      .then(data => {
        return userdata = data.json();      
      }).then(userData => {
        fetch(`https://flashcoll-backend.glitch.me/github/user/${userData.external_accounts[0].provider_user_id}`)
          .then(response => {
          let json = response.json();
          json.then(result => {
            userData.githubURL = `https://github.com/${result.login}`;
            userData.githubUsername = result.login;
            return userData;
          }).then(newUserData => {
            this.runSQLOnHarperDB(`SELECT * FROM flashcoll.user_profile where id = "${userId}"`)
              .then(data => {
                return data.json();
              })
              .then(result => {
                if (result.length < 1) {
                  const sqlQuery = `INSERT INTO flashcoll.user_profile (id, firstName, lastName, email, githubProfileURL, githubID, githubUsername, userImageURL, facebookURL, twitterURL, instagramURL, linkedInURL, portfolioURL) VALUE ("${newUserData.id}", "${newUserData.first_name}", "${newUserData.last_name}", "${''}", "${newUserData.githubURL}", "${newUserData.external_accounts[0].provider_user_id}", "${newUserData.githubUsername}", "${userData.profile_image_url}", "${''}", "${''}", "${''}", "${''}", "${''}")`;
                  this.runSQLOnHarperDB(sqlQuery);
                }
              })
          })
        })
      })
  }

  async getUserSubProfileByUserId(userId: string) {
    return await this.runSQLOnHarperDB(`SELECT * FROM flashcoll.user_profile where id = "${userId}"`)
      .then(data => {
        return data.json();
      });
  }

  async updateUserSubProfileData(userData: any) {
    const sqlQuery = `UPDATE flashcoll.user_profile 
                      SET email="${userData.email}",
                          facebookURL="${userData.facebookURL}",
                          twitterURL="${userData.twitterURL}",
                          instagramURL="${userData.instagramURL}",
                          linkedInURL="${userData.linkedInURL}",
                          portfolioURL="${userData.portfolioURL}"
                      WHERE id = "${userData.id}"`;
    return await this.runSQLOnHarperDB(sqlQuery);
  }
  //#endregion

}
