import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'bgt-bill-card-category-list',
  templateUrl: './bill-card-category-list.component.html',
  styleUrls: ['./bill-card-category-list.component.scss'],
})
export class BillCardCategoryListComponent implements OnInit {
  @Input() categories: string[] = [];

  constructor() {}

  ngOnInit(): void {}
}
