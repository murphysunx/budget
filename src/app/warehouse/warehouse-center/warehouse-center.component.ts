import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IWarehouse } from '../interfaces/warehouse';
import { WarehouseService } from '../services/warehouse.service';

@Component({
  selector: 'bgt-warehouse-center',
  templateUrl: './warehouse-center.component.html',
  styleUrls: ['./warehouse-center.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WarehouseCenterComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();

  cols = 2;
  rowHeight = '1: 1';

  warehouses: IWarehouse[] = [];

  constructor(
    private cd: ChangeDetectorRef,
    private warehouseService: WarehouseService
  ) { }

  ngOnInit(): void {
    this.warehouseService.warehouses$.pipe(takeUntil(this.destroy$)).subscribe(
      warehouses => {
        this.warehouses = warehouses;
        this.cd.markForCheck();
      }
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
