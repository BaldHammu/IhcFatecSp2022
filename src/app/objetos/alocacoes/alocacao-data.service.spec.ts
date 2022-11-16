import { TestBed } from '@angular/core/testing';

import { AlocacaoDataService } from './alocacao-data.service';

describe('AlocacaoDataService', () => {
  let service: AlocacaoDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlocacaoDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
