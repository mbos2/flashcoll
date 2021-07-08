import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClerkService {  

  getClerk: any;
  async clerk() {
    // @ts-ignore
    const clerkObject = window.Clerk;
    try {
      // Load Clerk environment & session if available
      await clerkObject.load();
      this.getClerk = clerkObject;
      // window.MyClerk = clerkObject;
      const userButtonEl = document.getElementById('user-button');
      const authLinks = document.getElementById('auth-links');
      if (clerkObject.user) {
        // Mount user button component
        clerkObject.mountUserButton(userButtonEl);
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

  get CLERK_OBJECT() {
    return this.getClerk;
  }
}