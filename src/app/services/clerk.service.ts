import {Injectable} from '@angular/core';
import {fromEvent, ReplaySubject} from "rxjs";
import {tap, take, concatMap} from "rxjs/operators";
import {WindowRef} from "./window.service";
import type {SignInProps, SignUpProps, Clerk as ClerkBase} from '@clerk/types'

type Clerk = ClerkBase & {
  load: () => Promise<void>
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

  constructor(private windowRef: WindowRef) {
    this.loadClerkJS().subscribe();
  }

  public mountSignIn(targetElement: HTMLDivElement, props?: SignInProps) {
    this._loadedClerk$.subscribe(clerk => {
      clerk.mountSignIn(targetElement, props)
    });
  }

  public mountSignUp(targetElement: HTMLDivElement, props?: SignUpProps) {
    this._loadedClerk$.subscribe(clerk => {
      clerk.mountSignUp(targetElement, props)
    })
  }

  private loadClerkJS() {
    const script = ClerkService.buildScriptTag();
    const load$ = fromEvent(script, 'load').pipe(
      take(1),
      concatMap(() => this.windowRef.nativeWindow.Clerk.load()),
      tap(() => this._loadedClerk$.next(this.windowRef.nativeWindow.Clerk))
    );
    document.body.appendChild(script);
    return load$;
  }

  private static buildScriptTag(frontendApi = 'clerk.g6v9y.5r22c.lcl.dev'): HTMLScriptElement {
    const script = document.createElement('script');
    script.setAttribute('data-clerk-frontend-api', frontendApi);
    script.async = true;
    script.src = `https://${frontendApi}/npm/@clerk/clerk-js@1/dist/clerk.browser.js`;
    return script;
  }
}
