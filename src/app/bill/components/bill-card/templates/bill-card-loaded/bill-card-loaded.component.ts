import { Component, Input, OnInit } from '@angular/core';
import { IBill } from 'src/app/bill/types/bill';

@Component({
  selector: 'bgt-bill-card-loaded',
  templateUrl: './bill-card-loaded.component.html',
  styleUrls: ['./bill-card-loaded.component.scss'],
})
export class BillCardLoadedComponent implements OnInit {
  @Input() cardIndex?: number;
  @Input() bill!: IBill;

  constructor() {}

  ngOnInit(): void {}
}
