import { TestBed } from '@angular/core/testing';

import { ArtefatoService } from './artefato.service';

describe('ArtefatoService', () => {
  let service: ArtefatoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtefatoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
