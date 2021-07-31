import { Injectable } from "@angular/core";
import { environment } from "environments/environment";

@Injectable()
export class HarperDbService {
  private REST_API = 'https://api.flashcoll.com';
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
    const options = this.harperRequestOptions(sqlQuery);
    return await fetch(this.harpedAPI, options);
  }

  //#endregion
  
  //#region HarperDbMethods

  async generateUserSubprofileIfNotExist(userId: string) {
    let userdata: any;
    return await fetch(`${this.REST_API}/clerk/user/${userId}`)
      .then(data => {
        return userdata = data.json();      
      }).then(userData => {

        fetch(`${this.REST_API}/github/user/${userData.external_accounts[0].provider_user_id}`)
          .then(response => {
          const json = response.json();
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

  async getUsernameFromSubprofile(userId: string) {
    return await this.runSQLOnHarperDB(`SELECT * FROM flashcoll.user_profile where id = "${userId}"`)
      .then(data => {
        return data.json();
      }).then((result) => {
        return result[0].githubUsername;
      });
  }

  async getUserSubProfileByGithubUsername(username: string) {
    return await this.runSQLOnHarperDB(`SELECT * FROM flashcoll.user_profile where githubUsername = "${username}"`)
      .then(data => {
        return data.json();
      });
  }

  async getUserProfileFullByGithubUsername(username: string) {
    let userProjects: any;
    let userProfile: any;
    let userData = {
      profile: {},
      projects: {}
    };
    await this.getUserSubProfileByGithubUsername(username)
      .then(data => {
        userProfile = data;
      });
    await this.getAllUserProjectsByGithubUsername(username)
      .then(data => {
        userProjects = data.json();
      })
    return userData = {
      profile: userProfile,
      projects: userProjects
    }
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

  async createNewProject(projectData: any) {
    // const arr = String(projectData.tags).split(',');
    const sqlQuery = `INSERT INTO flashcoll.project 
                    (id, userID, githubUsername, githubRepoURL, projectTitle, projectShortDescription)
                    VALUE ("${projectData.id}", 
                    "${projectData.userID}",
                    "${projectData.githubUsername}", 
                    "${projectData.githubRepoURL}", 
                    "${projectData.projectTitle}", 
                    "${projectData.shortDescription}")`;
                    //  "${projectData.tags}")`;

    return await this.runSQLOnHarperDB(sqlQuery);
  }

  async getAllProjects() {
    const sqlQuery = `SELECT * FROM flashcoll.project ORDER BY __createdtime__ DESC`;
    return await this.runSQLOnHarperDB(sqlQuery);
  }

  async getAllUserProjects(userId: string) {
    const sqlQuery = `SELECT * FROM flashcoll.project where userID = "${userId}"`;
    return await this.runSQLOnHarperDB(sqlQuery);
  }

  async getAllUserProjectsByGithubUsername(username: string) {
    const sqlQuery = `SELECT * FROM flashcoll.project where githubUsername = "${username}"`;
    return await this.runSQLOnHarperDB(sqlQuery);
  }

  async getProjectDetails(projectId: string) {
    const sqlQuery = `SELECT * FROM flashcoll.project where id = "${projectId}"`;
    return await this.runSQLOnHarperDB(sqlQuery);
  }

  async getProjectsByTag(tag: string) {
    const sqlQuery = `SELECT * FROM flashcoll.project WHERE "${tag}" = ANY(tags)`;
    //SELECT * FROM flashcoll.project WHERE tags like '%ovca%'
    return await this.runSQLOnHarperDB(sqlQuery);
  }

  async deleteProject(projectId: string) {
    const sqlQuery = `DELETE FROM flashcoll.project WHERE id = "${projectId}"`;
    return await this.runSQLOnHarperDB(sqlQuery);
  }

  //#endregion

}
