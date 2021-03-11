import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'bgt-bill-card-category',
  templateUrl: './bill-card-category.component.html',
  styleUrls: ['./bill-card-category.component.scss'],
})
export class BillCardCategoryComponent implements OnInit {
  @Input() category!: string;

  constructor() {}

  ngOnInit(): void {}
}
