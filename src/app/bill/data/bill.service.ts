import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IBill } from '../types/bill';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  constructor() {}

  createBill(): void {
    // TODO
  }

  getBill(billId: string): Observable<IBill | null> {
    // TODO
    return of({} as IBill);
  }

  getBills(): void {
    // TODO
  }

  updateBill(): void {
    // TODO
  }

  deleteBill(): void {
    // TODO
  }
}
