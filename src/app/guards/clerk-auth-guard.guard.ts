import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClerkAuthGuardGuard implements CanActivate {

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // @ts-ignore
    // if(window.Clerk.user !== null) {
    //   // @ts-ignore
    //   this.router.navigate(['app'])
    // }
    // @ts-ignore
    console.log(window.Clerk);
    return true;
  }  
}
