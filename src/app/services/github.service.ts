import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private REST_API = 'https://api.flashcoll.com';

  async getUserRepositories(userId: string) {
    const userRepos = await fetch(`${this.REST_API}/github/user/${userId}/repos`);
    return userRepos;
  }
  
}