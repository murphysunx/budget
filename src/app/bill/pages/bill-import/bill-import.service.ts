import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IBill } from '../../types/bill';

@Injectable()
export class BillImportService {
  importedBills$ = new BehaviorSubject<IBill[]>([]);

  constructor() {}
}
