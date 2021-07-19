import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ClerkService } from 'app/services/clerk.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  isAuth: any;
  constructor(private clerkService: ClerkService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {    
    return this.clerkService.user$.pipe(
      map(e => {
        if (!e) {
          return this.router.parseUrl('/not-authorized');          
        }
        return true;
      }),
    );
  }
}
