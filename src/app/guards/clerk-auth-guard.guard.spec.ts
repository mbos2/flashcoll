import { TestBed } from '@angular/core/testing';

import { ClerkAuthGuardGuard } from './clerk-auth-guard.guard';

describe('ClerkAuthGuardGuard', () => {
  let guard: ClerkAuthGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ClerkAuthGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
