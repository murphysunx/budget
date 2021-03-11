import { TestBed } from '@angular/core/testing';

import { BillImportService } from './bill-import.service';

describe('BillImportService', () => {
  let service: BillImportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillImportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
