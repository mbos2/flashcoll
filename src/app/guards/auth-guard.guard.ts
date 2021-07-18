import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ClerkService } from 'app/services/clerk.service';
import { Observable, of, Subscription } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  isAuth: any;
  constructor(private clerkService: ClerkService, private router: Router) {
    // this.clerkService.user$.subscribe(user => {
    //   if (!user) {
    //     this.isAuth = true;
    //   } else {
    //     this.isAuth = false;
    //   }
    // });
    // console.log(this.isAuth);

  }
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
