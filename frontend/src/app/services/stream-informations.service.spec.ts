import { TestBed } from '@angular/core/testing';

import { StreamInformationsService } from './stream-informations.service';

describe('StreamInformationsService', () => {
  let service: StreamInformationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StreamInformationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
