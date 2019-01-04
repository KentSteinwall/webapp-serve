import { TestBed } from '@angular/core/testing';

import { UserProfile1Service } from './user-profile1.service';

describe('UserProfile1Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserProfile1Service = TestBed.get(UserProfile1Service);
    expect(service).toBeTruthy();
  });
});
