import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BillItem, IBillItem, IBillItemDraft } from '@bill/types/bill-item';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'underscore';

@Injectable({
  providedIn: 'root'
})
export class BillItemService {

  constructor(private http: HttpClient) { }

  private postBillItems(items: IBillItemDraft[], billId: string): Observable<BillItem[]> {
    return this.http.post<(IBillItem)[]>(environment.backend + `bills/${billId}/items/`, items).pipe(
      map(response => {
        return _.map(response, (resp) => {
          const item = new BillItem(resp.id, resp);
          // TODO
          return item;
        });
      })
    );
  }

  createBillItems(items: IBillItemDraft[], billId: string): Observable<BillItem[]> {
    return this.postBillItems(items, billId);
  }
}
