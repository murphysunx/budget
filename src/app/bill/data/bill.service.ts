import { Injectable } from '@angular/core';
import { IOrderedMap } from '@shared/types/ordered-map';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'underscore';
import { v4 as uuid4 } from 'uuid';
import { Bill, IBill, IDraftBill } from '../types/bill';
import { IBillItem } from '../types/bill-item';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  private orderedBills$ = new BehaviorSubject<IOrderedMap<Bill>>({
    ids: [],
    elements: {},
  });

  constructor() {}

  get bills$(): Observable<Bill[]> {
    return this.orderedBills$.pipe(
      map((orderedBills) => {
        const { ids, elements } = orderedBills;
        return _.map(ids, (id) => {
          return elements[id];
        });
      })
    );
  }

  createBill(rawBill: IDraftBill): Bill {
    const id = uuid4();
    const bill = new Bill(id, rawBill);
    const { ids, elements } = this.orderedBills$.value;
    const newElements = {
      ...elements,
    };
    newElements[bill.id] = bill;
    this.orderedBills$.next({
      ids: [...ids, bill.id],
      elements: newElements,
    });
    return bill;
  }

  createBillItem(): IBillItem {
    const item: IBillItem = {
      cost: 0,
    };
    return item;
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
