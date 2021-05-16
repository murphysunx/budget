import { Injectable, OnDestroy } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { IBillItemDraft } from '@bill/types/bill-item';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BillFormBuilderService } from '../services/bill-form-builder.service';

@Injectable()
export class BillItemFormService implements OnDestroy {
  private destroy$ = new Subject();

  billItemControl: FormGroup | null = null;

  constructor(private billFormBuilderService: BillFormBuilderService) { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  createBillItemCtrl(item?: IBillItemDraft): void {
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

  loadBillItem(item: IBillItemDraft): void {
    this.billItemControl?.patchValue(item);
    if (!!item.categories && item.categories.length > 0) {
      const categoryArrayControl = this.billItemControl!.get(
        'categories'
      ) as FormArray;
      categoryArrayControl.patchValue(item.categories);
    }
  }

  turnOffBillItemDetail(): void {
    const costCtrl = this.billItemControl!.get('cost') as FormControl;
    this.billItemControl?.patchValue({
      qty: '',
      price: '',
      cost: costCtrl.value,
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
