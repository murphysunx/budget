import { TestBed } from '@angular/core/testing';

import { BillFormBuilderService } from './bill-form-builder.service';

describe('BillFormBuilderService', () => {
  let service: BillFormBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillFormBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
