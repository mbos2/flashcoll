import { Injectable } from '@angular/core';

function getNativeWindow(): any {
  return window;
}

@Injectable({
  providedIn: 'root'
})
export class WindowRef {
  get nativeWindow(): any {
    return getNativeWindow();
  }
}
