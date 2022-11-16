import { TestBed } from '@angular/core/testing';

import { ExecucaoDataService } from './execucao-data.service';

describe('ExecucaoDataService', () => {
  let service: ExecucaoDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExecucaoDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
