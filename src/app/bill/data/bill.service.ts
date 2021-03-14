import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IOrderedMap } from 'src/app/shared/types/ordered-map';
import * as _ from 'underscore';
import { v4 as uuid4 } from 'uuid';
import { IBill, IDraftBill } from '../types/bill';
import { IBillItem } from '../types/bill-item';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  private orderedBills$ = new BehaviorSubject<IOrderedMap<IBill>>({
    ids: [],
    elements: {},
  });

  constructor() {}

  get bills$(): Observable<IBill[]> {
    return this.orderedBills$.pipe(
      map((orderedBills) => {
        const { ids, elements } = orderedBills;
        return _.map(ids, (id) => {
          return elements[id];
        });
      })
    );
  }

  draftBill(rawBill: IDraftBill): IDraftBill {
    const { items } = rawBill;
    const bill: IDraftBill = {
      ...rawBill,
      items: items ? _.map(items, (item) => this.createBillItem()) : [],
    };
    return bill;
  }

  createBill(rawBill: IDraftBill): IBill {
    const draft = this.draftBill(rawBill);
    const { items } = draft;
    const bill: IBill = {
      id: uuid4(),
      ...draft,
      items: items ? _.map(items, (item) => this.createBillItem()) : [],
    };
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
