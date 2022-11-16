import { TestBed } from '@angular/core/testing';

import { SprintDataService } from './sprint-data.service';

describe('SprintDataService', () => {
  let service: SprintDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SprintDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
