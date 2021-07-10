import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { WindowRef } from 'app/services/window.service';
import { Observable } from 'rxjs';
import {ClerkService} from "../services/clerk.service";

@Injectable({
  providedIn: 'root'
})
export class ClerkAuthGuardGuard implements CanActivate {
  private isUserAuthenthicated = false;
  clerkService: any;
  constructor(clerk: ClerkService, windowRef :WindowRef) {
    console.log();
  }  

  canActivate(
    route: ActivatedRouteSnapshot,    
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
}
