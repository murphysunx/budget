import { TestBed } from '@angular/core/testing';

import { BillCardService } from './bill-card.service';

describe('BillCardService', () => {
  let service: BillCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
