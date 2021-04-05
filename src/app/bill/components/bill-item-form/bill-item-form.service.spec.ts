import { TestBed } from '@angular/core/testing';

import { BillItemFormService } from './bill-item-form.service';

describe('BillItemFormService', () => {
  let service: BillItemFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillItemFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
