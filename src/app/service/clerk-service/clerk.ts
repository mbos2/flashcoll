import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClerkService {  

  getClerk: any;
  async clerk() {
    // @ts-ignore
    this.getClerk = window.Clerk;
    try {
      // Load Clerk environment & session if available
      await this.getClerk.load();
      // @ts-ignore
      console.log(window.Clerk);
      const userButtonEl = document.getElementById('user-button');
      const authLinks = document.getElementById('auth-links');
      if (this.getClerk.user) {
        // Mount user button component
        this.getClerk.mountUserButton(userButtonEl);
        // @ts-ignore
        authLinks.style.display = 'none';
      }
    } catch (err) {
      console.error('Clerk: ', err);
    }
  }

  async initClerk() {
    const frontendApi = 'clerk.g6v9y.5r22c.lcl.dev';
    const script = document.createElement('script');
    script.setAttribute('data-clerk-frontend-api', frontendApi);
    script.async = true;
    script.src = `https://${frontendApi}/npm/@clerk/clerk-js@1/dist/clerk.browser.js`;
    script.addEventListener('load', await this.clerk);
    document.body.appendChild(script);  
  }
}