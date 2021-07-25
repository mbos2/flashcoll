import {Injectable, NgZone} from '@angular/core';
import {BehaviorSubject, fromEvent, Observable, ReplaySubject, Subject} from "rxjs";
import {tap, take, concatMap, map, distinctUntilChanged} from "rxjs/operators";
import {WindowRef} from "./window.service";
import type { SignInProps, SignUpProps, Clerk as ClerkBase, UserResource, UserButtonProps } from '@clerk/types';
import {Router} from "@angular/router";

type Clerk = ClerkBase & {
  load: (opts: { navigate: (to: string) => Promise<unknown> }) => Promise<void>
}

declare global {
  interface Window {
    // Please keep the ts-ignore here for now
    // This is a known issue that will be fixed soon
    // @ts-ignore
    Clerk?: Clerk
  }
}

@Injectable({
  providedIn: 'root'
})
export class ClerkService {
  private readonly _loadedClerk$ = new ReplaySubject<Clerk>(1);
  
  public get user$(): Observable<UserResource | null> { 
    const user$ = new ReplaySubject<UserResource | undefined | null>(1);

    this._loadedClerk$.subscribe((clerk) => {
      clerk.addListener(({ user }) => user$.next(user));
    })

    return user$.asObservable().pipe(
      map(user => !!user ? user : null),
      distinctUntilChanged()
    )
  }

  constructor(private windowRef: WindowRef, private router: Router, private ngZone: NgZone) {
    this.loadClerkJS().subscribe();
    this.user$.subscribe();
    console.log(window.Clerk)
  }

  public signOut() {
    this._loadedClerk$.pipe(concatMap((clerk) => clerk.signOut())).subscribe();
  }

  public mountUserButton(targetElement: HTMLDivElement, props?: UserButtonProps) {
    this._loadedClerk$.subscribe(clerk => {
      clerk.mountUserButton(targetElement, props)
    });
  }

  public unMountUserButton(targetElement: HTMLDivElement, props?: UserButtonProps) {
    this._loadedClerk$.subscribe(clerk => {
      clerk.unmountUserButton(targetElement)
    });
  }

  public mountSignIn(targetElement: HTMLDivElement, props?: SignInProps) {
    this._loadedClerk$.subscribe(clerk => {
      clerk.mountSignIn(targetElement, props)
    });
  }

  public unMountSignIn(targetElement: HTMLDivElement) {
    this._loadedClerk$.subscribe(clerk => {
      clerk.unmountSignIn(targetElement)
    });
  }

  public mountSignUp(targetElement: HTMLDivElement, props?: SignUpProps) {
    this._loadedClerk$.subscribe(clerk => {
      clerk.mountSignUp(targetElement, props)
    })
  }

  public unmountSignUp(targetElement: HTMLDivElement) {
    this._loadedClerk$.subscribe(clerk => {
      clerk.unmountSignUp(targetElement)
    })
  }

  public mountUserProfile(targetElement: HTMLDivElement, props?: UserButtonProps) {
    this._loadedClerk$.subscribe(clerk => {
      clerk.mountUserProfile(targetElement, props)
    });
  }

  public unmountUserProfile(targetElement: HTMLDivElement, props?: UserButtonProps) {
    this._loadedClerk$.subscribe(clerk => {
      clerk.unmountUserProfile(targetElement)
    });
  }

  private loadClerkJS() {
    const navigate = (to: string) => {
        const [path, fragment] = to.split("#")
        return this.ngZone.run(() => this.router.navigate([path], {fragment: fragment}));
    }

    const script = ClerkService.buildScriptTag();
    const load$ = fromEvent(script, 'load').pipe(
      take(1),
      concatMap(() => this.windowRef.nativeWindow.Clerk.load({navigate})),
      tap(() => this._loadedClerk$.next(this.windowRef.nativeWindow.Clerk))
    );
    document.body.appendChild(script);
    return load$;
  }
  //clerk.ww3ul.6bc9k.lcl.dev
  //process.env.
  private static buildScriptTag(frontendApi = ANGULAR_CLERK_FRONTEND_API): HTMLScriptElement {
    const script = document.createElement('script');
    script.setAttribute('data-clerk-frontend-api', frontendApi);
    script.async = true;
    script.src = `https://${frontendApi}/npm/@clerk/clerk-js@1/dist/clerk.browser.js`;
    return script;
  }
}