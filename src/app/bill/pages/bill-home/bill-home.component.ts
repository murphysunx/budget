import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BillService } from '../../data/bill.service';
import { IBill } from '../../types/bill';

@Component({
  selector: 'bgt-bill-home',
  templateUrl: './bill-home.component.html',
  styleUrls: ['./bill-home.component.scss'],
})
export class BillHomeComponent implements OnInit {
  constructor(private billService: BillService) {}

  get bills$(): Observable<IBill[]> {
    return this.billService.bills$;
  }

  ngOnInit(): void {}
}
