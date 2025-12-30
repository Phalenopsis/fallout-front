import { TestBed } from '@angular/core/testing';

import { SkillCreationService } from './skill-creation-service';

describe('SkillCreationService', () => {
  let service: SkillCreationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkillCreationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
