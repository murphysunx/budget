import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { WarehouseProductDetailComponent } from './warehouse-product-detail/warehouse-product-detail.component';

export interface IProduct {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  packSize: number;
}

@Component({
  selector: 'bgt-warehouse-detail',
  templateUrl: './warehouse-detail.component.html',
  styleUrls: ['./warehouse-detail.component.scss']
})
export class WarehouseDetailComponent implements OnInit, AfterViewInit {

  @ViewChild('productTable', { static: true }) productTable: MatTable<IProduct> | undefined;

  products: IProduct[] = [];
  dataSource!: MatTableDataSource<IProduct>;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['name', 'quantity'];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.products = [
      {
        id: `0`,
        name: `手提袋`,
        quantity: 10,
        unit: `把`,
        packSize: 100
      },
      {
        id: `0`,
        name: `无纺布袋`,
        quantity: 20,
        unit: `把`,
        packSize: 100
      },
    ];
    if (!!this.productTable) {
      this.dataSource = new MatTableDataSource(this.products);
      this.dataSource.sort = this.sort;
      this.productTable.dataSource = this.dataSource;
      this.productTable.renderRows();
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onClickProduct(product: IProduct): void {
    const dialogRef = this.dialog.open(WarehouseProductDetailComponent, {
      data: product
    });
  }
}
