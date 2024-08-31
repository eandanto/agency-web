import { TestBed } from '@angular/core/testing';

import { OffdayService } from './offday.service';

describe('OffdayService', () => {
  let service: OffdayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OffdayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
