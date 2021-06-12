import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'app/product/services/product.service';
import { IProduct } from 'app/product/types/product';
import { defaults } from 'underscore';

@Component({
  selector: 'bgt-warehouse-product-detail',
  templateUrl: './warehouse-product-detail.component.html',
  styleUrls: ['./warehouse-product-detail.component.scss']
})
export class WarehouseProductDetailComponent implements OnInit {

  product!: IProduct;

  constructor(
    private dialogRef: MatDialogRef<WarehouseProductDetailComponent>,
    @Inject(MAT_DIALOG_DATA) private data: IProduct,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.product = this.data;
  }

  dismiss(): void {
    this.dialogRef.close();
  }

  updateProduct(update: Partial<IProduct>): void {
    const updatedProduct: IProduct = defaults(update, this.product);
    // TODO
    this.productService.updateProduct(updatedProduct);
    this.dismiss();
  }
}
