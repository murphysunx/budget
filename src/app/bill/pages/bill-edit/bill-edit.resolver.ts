import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { BillService } from '@bill/data/bill.service';
import { Bill } from '@bill/types/bill';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillEditResolver implements Resolve<Bill | null> {
  constructor(private billService: BillService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Bill | null> {
    const bid = route.params.id;
    return this.billService.getBill(bid);
  }
}
