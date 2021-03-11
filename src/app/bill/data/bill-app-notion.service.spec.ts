import { TestBed } from '@angular/core/testing';

import { BillAppNotionService } from './bill-app-notion.service';

describe('BillAppNotionService', () => {
  let service: BillAppNotionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillAppNotionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
