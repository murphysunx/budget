import { Component, Input, OnInit } from '@angular/core';
import { BillCardService } from './bill-card.service';
import { EBillCardStates } from './states/bill-card-states';

@Component({
  selector: 'bgt-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss'],
  providers: [BillCardService],
})
export class BillCardComponent implements OnInit {
  @Input() billId: string | null = null;

  readonly BillCardState = EBillCardStates;

  constructor(public billCardService: BillCardService) {}

  ngOnInit(): void {

  }
}
