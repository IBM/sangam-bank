import { TestBed } from '@angular/core/testing';

import { ResponseProcessingService } from './response-processing.service';

describe('ResponseProcessingService', () => {
  let service: ResponseProcessingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponseProcessingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
