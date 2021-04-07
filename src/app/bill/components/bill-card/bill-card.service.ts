import { Injectable } from '@angular/core';
import { IStateful } from '@shared/components/stateful/stateful';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BillService } from '../../data/bill.service';
import { Bill, IBill } from '../../types/bill';
import { EBillCardStates } from './states/bill-card-states';

@Injectable()
export class BillCardService {
  private UIState = new BehaviorSubject<IStateful<EBillCardStates>>(
    {
      state: EBillCardStates.notInit
    }
  );

  readonly UIState$ = this.UIState.asObservable();

  bill$: Observable<IBill | null> | null = null;

  constructor(private billService: BillService) { }

  loadBillById(billId: string): void {
    if (!billId) {
      this.UIState.next({ state: EBillCardStates.empty });
      return;
    }
    this.UIState.next({ state: EBillCardStates.loading });
    this.bill$ = this.billService.getBill(billId).pipe(
      catchError((err) => {
        console.error(`[bill-card service] error while loading bill`, err);
        this.UIState.next({ state: EBillCardStates.error });
        return of(null);
      })
    );
  }

  loadBill(bill: Bill, index: number = -1): void {
    this.bill$ = of(bill);
    const attrs: any = { bill };
    if (index >= 0) {
      attrs.cardIndex = index;
    }
    this.UIState.next({
      state: EBillCardStates.loaded, attrs
    });
  }
}
