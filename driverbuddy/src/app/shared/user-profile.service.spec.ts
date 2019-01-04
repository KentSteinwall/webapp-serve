import { TestBed } from '@angular/core/testing';

import { InsuranceService } from './user-profile.service';

describe('UserProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InsuranceService = TestBed.get(InsuranceService);
    expect(service).toBeTruthy();
  });
});
