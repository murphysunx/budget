import { Type } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { Bill } from '@bill/types/bill';
import { BillCardService } from './bill-card.service';
import { EBillCardStates } from './states/bill-card-states';
import { BillCardEmptyComponent } from './templates/bill-card-empty/bill-card-empty.component';
import { BillCardErrorComponent } from './templates/bill-card-error/bill-card-error.component';
import { BillCardLoadedComponent } from './templates/bill-card-loaded/bill-card-loaded.component';
import { BillCardLoadingComponent } from './templates/bill-card-loading/bill-card-loading.component';

@Component({
  selector: 'bgt-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss'],
  providers: [BillCardService],
})
export class BillCardComponent implements OnInit {
  @Input() billId!: string;
  @Input() bill?: Bill;
  @Input() cardIndex?: number;

  stateConfig: {
    [key in keyof typeof EBillCardStates]: Type<any>;
  } = {
      notInit: BillCardEmptyComponent,
      loading: BillCardLoadingComponent,
      loaded: BillCardLoadedComponent,
      empty: BillCardEmptyComponent,
      error: BillCardErrorComponent,
    };

  readonly BillCardState = EBillCardStates;

  constructor(public billCardService: BillCardService) { }

  ngOnInit(): void {
    if (!!this.bill) {
      this.billCardService.loadBill(this.bill, this.cardIndex);
    } else {
      this.billCardService.loadBillById(this.billId);
    }
  }
}
