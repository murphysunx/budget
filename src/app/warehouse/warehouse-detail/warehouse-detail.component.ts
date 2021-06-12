import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'app/product/services/product.service';
import { IProduct } from 'app/product/types/product';
import { Table } from 'primeng-lts/table';
import { filter, pluck, switchMap, tap } from 'rxjs/operators';
import { WarehouseProductDetailComponent } from './warehouse-product-detail/warehouse-product-detail.component';

@Component({
  selector: 'bgt-warehouse-detail',
  templateUrl: './warehouse-detail.component.html',
  styleUrls: ['./warehouse-detail.component.scss']
})
export class WarehouseDetailComponent implements OnInit {

  @ViewChild('dt') table!: Table;

  whseId: string | undefined;
  products: IProduct[] = [];

  rowGroupMetadata: any;
  cols: { field: string, header: string }[] = [];

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      pluck('id'),
      filter(x => !!x),
      tap(id => this.whseId = id),
      switchMap(id => {
        return this.productService.getProductsInWhse(id);
      })
    ).subscribe(products => {
      this.products = products;
      this.updateRowGroupMetaData();
    });
    this.cols = [
      {
        field: `name`,
        header: `商品名`
      },
      {
        field: `quantity`,
        header: `数量`,
      },
      {
        field: `unit`,
        header: `单位`,
      },
      {
        field: `packSize`,
        header: `规格`,
      },
    ];
  }

  private updateRowGroupMetaData(): void {
    this.rowGroupMetadata = {};
    if (this.products) {
      for (let i = 0; i < this.products.length; i++) {
        const rowData = this.products[i];
        const category = rowData.category;

        if (i === 0) {
          this.rowGroupMetadata[category] = { index: 0, size: 1 };
        }
        else {
          const previousRowData = this.products[i - 1];
          const previousRowGroup = previousRowData.category;
          if (category === previousRowGroup) {
            this.rowGroupMetadata[category].size++;
          }
          else {
            this.rowGroupMetadata[category] = { index: i, size: 1 };
          }
        }
      }
    }
  }

  onClickProduct(product: IProduct): void {
    const dialogRef = this.dialog.open(WarehouseProductDetailComponent, {
      data: product
    });
  }

  onSearchQuantity($event: Event): void {
    const val = ($event.target as HTMLInputElement).value;
    if (val && val.trim().length) {
      const quantity = parseInt(val, 10);
      if (!isNaN(quantity)) {
        this.table.filter(quantity, 'quantity', 'lte');
      }
    } else {
      this.table.filter(-Infinity, 'quantity', 'gt');
    }
  }

  intentNewProduct(): void {

  }

  editProduct(product: IProduct): void {
    const edit = this.dialog.open(WarehouseProductDetailComponent, {
      data: product
    });
  }
}
