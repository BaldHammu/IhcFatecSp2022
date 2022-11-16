import { TestBed } from '@angular/core/testing';

import { ExecucaoService } from './execucao.service';

describe('ExecucaoService', () => {
  let service: ExecucaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExecucaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
