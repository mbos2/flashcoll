import { TestBed } from '@angular/core/testing';

import { LoggedInRedirectGuardGuard } from './logged-in-redirect-guard.guard';

describe('LoggedInRedirectGuardGuard', () => {
  let guard: LoggedInRedirectGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoggedInRedirectGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
