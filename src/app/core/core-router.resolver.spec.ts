import { TestBed } from '@angular/core/testing';

import { CoreRouterResolver } from './core-router.resolver';

describe('CoreRouterResolver', () => {
  let resolver: CoreRouterResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CoreRouterResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
