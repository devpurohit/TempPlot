import { TestBed, inject } from '@angular/core/testing';

import { BweatService } from './bweat.service';

describe('BweatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BweatService]
    });
  });

  it('should be created', inject([BweatService], (service: BweatService) => {
    expect(service).toBeTruthy();
  }));
});
