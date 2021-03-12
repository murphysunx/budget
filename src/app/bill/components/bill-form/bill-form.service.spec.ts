import { TestBed } from '@angular/core/testing';

import { BillFormService } from './bill-form.service';

describe('BillFormService', () => {
  let service: BillFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
