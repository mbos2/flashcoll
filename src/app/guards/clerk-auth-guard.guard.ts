import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ClerkService } from '@service/clerk-service/clerk';

@Injectable({
  providedIn: 'root'
})
export class ClerkAuthGuardGuard implements CanActivate {
  constructor(clerkService: ClerkService) {
    console.log(window);
    // @ts-ignore
    console.log(window.Clerk);
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree { 
    return true;
  }  
}
