import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IProduct } from '../warehouse-detail.component';


@Component({
  selector: 'bgt-warehouse-product-detail',
  templateUrl: './warehouse-product-detail.component.html',
  styleUrls: ['./warehouse-product-detail.component.scss']
})
export class WarehouseProductDetailComponent implements OnInit {

  product!: IProduct;

  constructor(
    private dialogRef: MatDialogRef<WarehouseProductDetailComponent>,
    @Inject(MAT_DIALOG_DATA) private data: IProduct) { }

  ngOnInit(): void {
    this.product = this.data;
  }

}
