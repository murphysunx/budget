import { TestBed } from '@angular/core/testing';

import { BillEditResolver } from './bill-edit.resolver';

describe('BillEditResolver', () => {
  let resolver: BillEditResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(BillEditResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
