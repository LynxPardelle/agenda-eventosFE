import { TestBed } from '@angular/core/testing';

import { GenericAlertService } from './generic-alert.service';

describe('GenericAlertService', () => {
  let service: GenericAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenericAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
