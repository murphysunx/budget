import { Component, Input, OnInit } from '@angular/core';
import { Bill } from '@bill/types/bill';

@Component({
  selector: 'bgt-bill-card-loaded',
  templateUrl: './bill-card-loaded.component.html',
  styleUrls: ['./bill-card-loaded.component.scss'],
})
export class BillCardLoadedComponent implements OnInit {
  @Input() cardIndex?: number;
  @Input() bill!: Bill;

  constructor() {}

  ngOnInit(): void {}
}
