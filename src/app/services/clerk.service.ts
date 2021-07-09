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
  private readonly _clerkLoaded$ = new ReplaySubject<void>(1);
  private _clerkInstance: Clerk | undefined;

  constructor(private windowRef: WindowRef) {
    this.loadScript().subscribe();
  }

  public mountSignIn(targetElement: HTMLDivElement, props?: SignInProps) {
    this._clerkLoaded$.pipe(
      tap(() => {
        this.assertClerkLoaded(this._clerkInstance);
        this._clerkInstance.mountSignIn(targetElement, props)
      })
    ).subscribe();
  }

  public mountSignUp(targetElement: HTMLDivElement, props?: SignUpProps) {
    this._clerkLoaded$.pipe(
      tap(() => {
        this.assertClerkLoaded(this._clerkInstance);
        this._clerkInstance.mountSignUp(targetElement, props)
      })
    ).subscribe();
  }

  private loadScript() {
    const script = ClerkService.buildScriptTag();
    const load$ = fromEvent(script, 'load').pipe(
      take(1),
      concatMap(() => this.windowRef.nativeWindow.Clerk.load()),
      tap(() => this._clerkInstance = this.windowRef.nativeWindow.Clerk),
      tap(() => this._clerkLoaded$.next())
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

  private assertClerkLoaded(clerk: unknown): asserts clerk {
    if (!this._clerkInstance) {
      throw new Error("Clerk is not loaded yet - this should not be possible at this point, please contact the Clerk team :)")
    }
  }

}
