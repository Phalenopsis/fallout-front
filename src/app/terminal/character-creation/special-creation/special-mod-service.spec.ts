import { TestBed } from '@angular/core/testing';

import { SpecialModService } from './special-mod-service';

describe('SpecialModService', () => {
  let service: SpecialModService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecialModService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
