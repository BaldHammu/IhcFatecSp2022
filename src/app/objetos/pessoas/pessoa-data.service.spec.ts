import { TestBed } from '@angular/core/testing';

import { PessoaDataService } from './pessoa-data.service';

describe('PessoaDataService', () => {
  let service: PessoaDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PessoaDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
