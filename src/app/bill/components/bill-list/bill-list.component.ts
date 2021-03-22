import { Component, Input, OnInit } from '@angular/core';
import { Bill } from '../../types/bill';

@Component({
  selector: 'bgt-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.scss'],
})
export class BillListComponent implements OnInit {
  @Input() bills: Bill[] | null = [];

  constructor() {}

  ngOnInit(): void {}
}
