import { TestBed } from '@angular/core/testing';

import { ArtefatoDataService } from './artefato-data.service';

describe('ArtefatoDataService', () => {
  let service: ArtefatoDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtefatoDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
