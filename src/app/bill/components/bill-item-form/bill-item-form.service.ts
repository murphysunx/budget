import { Injectable, OnDestroy } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { IBillItem } from '@bill/types/bill-item';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BillFormBuilderService } from '../services/bill-form-builder.service';

@Injectable()
export class BillItemFormService implements OnDestroy {
  private destroy$ = new Subject();

  billItemControl: FormGroup | null = null;

  constructor(private billFormBuilderService: BillFormBuilderService) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  createBillItemCtrl(item?: IBillItem): void {
    const ctrl = this.billFormBuilderService.createBillItemForm(item);
    this.billItemControl = ctrl;
    this.setup();
  }

  private setup(): void {
    const qtyCtrl = this.billItemControl!.get('qty') as FormControl;
    const priceCtrl = this.billItemControl!.get('price') as FormControl;
    qtyCtrl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((qty) => {
      const costCtrl = this.billItemControl!.get('cost') as FormControl;
      const price = priceCtrl.value;
      if (!!price) {
        costCtrl.setValue(qty * price);
      } else {
        costCtrl.setValue(0);
      }
    });
    priceCtrl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((price) => {
      const costCtrl = this.billItemControl!.get('cost') as FormControl;
      const qty = qtyCtrl.value;
      if (!!qty) {
        costCtrl.setValue(qty * price);
      } else {
        costCtrl.setValue(0);
      }
    });
  }

  addCategory(category: string): void {
    const categoryArrayControl = this.billItemControl!.get(
      'categories'
    ) as FormArray;
    const categoryControl = this.billFormBuilderService.createCategoryControl(
      category
    );
    categoryArrayControl.push(categoryControl);
  }

  removeCategory(category: string): void {
    const categoryArrayControl = this.billItemControl!.get(
      'categories'
    ) as FormArray;
    const index = (categoryArrayControl.value as string[]).indexOf(category);
    if (index >= 0) {
      categoryArrayControl.removeAt(index);
    }
  }

  emptyCategories(): void {
    const categoryArrayControl = this.billItemControl!.get(
      'categories'
    ) as FormArray;
    categoryArrayControl.clear();
  }
}
