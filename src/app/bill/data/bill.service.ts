import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrderedMap } from '@shared/types/ordered-map';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as _ from 'underscore';
import { v4 as uuid4 } from 'uuid';
import { Bill, IBill, IDraftBill } from '../types/bill';
import { IBillItemDraft } from '../types/bill-item';
import { BillItemService } from './bill-item.service';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  private orderedBills$ = new BehaviorSubject<IOrderedMap<Bill>>({
    ids: [],
    elements: {},
  });

  constructor(private http: HttpClient, private billItemService: BillItemService) { }

  fetchBills$(): Observable<any[]> {
    return this.http.get<any[]>(environment.backend + `bills/`).pipe(
      tap(
        (bills) => {
          const ids = _.map(bills, (bill) => {
            return bill.id;
          });
          const elements: any = {};
          _.forEach(bills, bill => {
            const b = new Bill(bill.id, bill);
            elements[bill.id] = bill;
          });
          this.orderedBills$.next({ ids, elements });
        }
      ),
      catchError(err => {
        this.fetchBillErrorHandler(err);
        return of([]);
      })
    );
  }

  private fetchBillErrorHandler(err: any): void {
    // TODO handle fetch bill error
  }

  private postBill(bill: IDraftBill): Observable<IBill> {
    return this.http.post<IBill>(environment.backend + `bills/`, bill);
  }

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

  createBill(rawBill: IDraftBill, items: IBillItemDraft[] = []): Observable<any> {
    // const id = uuid4();
    return this.postBill(rawBill).pipe(
      tap(response => {
        const bill = new Bill(response.id, response);
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
      }),
      map(response => response.id),
      switchMap(billId => {
        return this.billItemService.createBillItems(items, billId);
      })
    );
  }

  getBill(billId: string): Observable<Bill | null> {
    if (_.include(this.orderedBills$.value.ids, billId)) {
      const bill = this.orderedBills$.value.elements[billId];
      return of(bill);
    }
    return of(null);
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
