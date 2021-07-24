import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClerkService } from '../services/clerk.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInRedirectGuard implements CanActivate {
  constructor(private clerkService: ClerkService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.clerkService.user$.pipe(
      map(e => {
        if (e) {
          return this.router.parseUrl('/projects');          
        }
        return true;
      }),
    );
  }
  
}
