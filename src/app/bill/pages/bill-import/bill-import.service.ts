import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Bill } from '../../types/bill';

@Injectable()
export class BillImportService {
  importedBills$ = new BehaviorSubject<Bill[]>([]);

  constructor() {}
}
