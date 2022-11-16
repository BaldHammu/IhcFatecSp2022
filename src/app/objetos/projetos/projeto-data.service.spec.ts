import { TestBed } from '@angular/core/testing';

import { ProjetoDataService } from './projeto-data.service';

describe('ProjetoDataService', () => {
  let service: ProjetoDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjetoDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
