import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BillService } from '../../data/bill.service';
import { Bill, IBill } from '../../types/bill';
import { EBillCardStates } from './states/bill-card-states';

@Injectable()
export class BillCardService {
  private UIState = new BehaviorSubject<EBillCardStates>(
    EBillCardStates.notInit
  );

  readonly UIState$ = this.UIState.asObservable();

  bill$: Observable<IBill | null> | null = null;

  constructor(private billService: BillService) {}

  loadBillById(billId: string): void {
    if (!billId) {
      this.UIState.next(EBillCardStates.empty);
      return;
    }
    this.UIState.next(EBillCardStates.loading);
    this.bill$ = this.billService.getBill(billId).pipe(
      catchError((err) => {
        console.error(`[bill-card service] error while loading bill`, err);
        this.UIState.next(EBillCardStates.error);
        return of(null);
      })
    );
  }

  loadBill(bill: Bill): void {
    this.bill$ = of(bill);
    this.UIState.next(EBillCardStates.loaded);
  }
}
