import { TestBed, inject } from '@angular/core/testing';

import { CrosswordDataService } from './crossword-data.service';

describe('CrosswordDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrosswordDataService],
    });
  });

  it('should be created', inject([CrosswordDataService], (service: CrosswordDataService) => {
    expect(service).toBeTruthy();
  }));
});
