import { TestBed } from '@angular/core/testing';

import { HittersService } from './hitters.service';

describe('HittersService', () => {
  let service: HittersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HittersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
