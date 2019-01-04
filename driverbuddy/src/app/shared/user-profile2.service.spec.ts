import { TestBed } from '@angular/core/testing';

import { UserProfile2Service } from './user-profile2.service';

describe('UserProfile2Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserProfile2Service = TestBed.get(UserProfile2Service);
    expect(service).toBeTruthy();
  });
});
