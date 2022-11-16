import { TestBed } from '@angular/core/testing';

import { TarefaDataService } from './tarefa-data.service';

describe('TarefaDataService', () => {
  let service: TarefaDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TarefaDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
