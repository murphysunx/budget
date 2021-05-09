import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BillService } from '../../data/bill.service';
import { Bill } from '../../types/bill';

@Component({
  selector: 'bgt-bill-home',
  templateUrl: './bill-home.component.html',
  styleUrls: ['./bill-home.component.scss'],
})
export class BillHomeComponent implements OnInit {
  constructor(private billService: BillService) { }

  get bills$(): Observable<Bill[]> {
    return this.billService.bills$;
  }

  ngOnInit(): void {
    // tslint:disable-next-line: deprecation
    this.billService.fetchBills$().subscribe();
  }
}
