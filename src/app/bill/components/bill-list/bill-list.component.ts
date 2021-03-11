import { Component, Input, OnInit } from '@angular/core';
import { IBill } from '../../types/bill';

@Component({
  selector: 'bgt-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.scss'],
})
export class BillListComponent implements OnInit {
  @Input() bills: IBill[] | null = [];

  constructor() {}

  ngOnInit(): void {}
}
