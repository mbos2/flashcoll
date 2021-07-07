import { Injectable } from '@angular/core';
// import { InjectionToken } from '@angular/core';

@Injectable({
  providedIn: 'root',
})  

export class ClerkService {

  public clerkObject: any;

  async clerk() {
    // @ts-ignore
    this.clerkObject = window.Clerk;
    console.log(this.clerkObject); // returns Clerk object in the console // TODO: To remove this comment
    try {
      // Load Clerk environment & session if available
      await this.clerkObject.load();

      const userButtonEl = document.getElementById('user-button');
      const authLinks = document.getElementById('auth-links');
      if (this.clerkObject.user) {
        // Mount user button component
        this.clerkObject.mountUserButton(userButtonEl);
        // @ts-ignore
        authLinks.style.display = 'none';
      }
    } catch (err) {
      console.error('Clerk: ', err);
    }
  }

  async initClerk() {
    const frontendApi = 'clerk.yvfqy.3fp0d.lcl.dev';
    const script = document.createElement('script');
    script.setAttribute('data-clerk-frontend-api', frontendApi);
    script.async = true;
    script.src = `https://${frontendApi}/npm/@clerk/clerk-js@1/dist/clerk.browser.js`;
    script.addEventListener('load', await this.clerk);
    document.body.appendChild(script);  
  }  
}

// export let CLERK_CLIENT = new InjectionToken<ClerkService>('app.clerkClient');