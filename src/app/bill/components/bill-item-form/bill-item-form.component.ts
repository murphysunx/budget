import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BillItemCategoryDialogComponent } from '../bill-item-category-dialog/bill-item-category-dialog.component';
import { BillItemFormService } from './bill-item-form.service';

@Component({
  selector: 'bgt-bill-item-form',
  templateUrl: './bill-item-form.component.html',
  styleUrls: ['./bill-item-form.component.scss'],
  providers: [{ useClass: BillItemFormService, provide: FormGroup }],
})
export class BillItemFormComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();

  @Input() billItemControl!: FormGroup;

  showDetails = false;

  constructor(private dialog: MatDialog, private fb: FormBuilder) {}

  ngOnInit(): void {
    const qtyCtrl = this.getBillItemPropertyControl('qty');
    const priceCtrl = this.getBillItemPropertyControl('price');
    qtyCtrl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((qty) => {
      const costCtrl = this.getBillItemPropertyControl('cost');
      const price = priceCtrl.value;
      if (!!price) {
        costCtrl.setValue(qty * price);
      } else {
        costCtrl.setValue(0);
      }
    });
    priceCtrl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((price) => {
      const costCtrl = this.getBillItemPropertyControl('cost');
      const qty = qtyCtrl.value;
      if (!!qty) {
        costCtrl.setValue(qty * price);
      } else {
        costCtrl.setValue(0);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getBillItemPropertyControl(propertyName: string): FormControl {
    return this.billItemControl.get(propertyName) as FormControl;
  }

  getCategoryControlArray(): FormArray {
    return this.billItemControl.get('categories') as FormArray;
  }

  addCategory(category: string): void {
    const categoryArrayControl = this.billItemControl.get(
      'categories'
    ) as FormArray;
    const categoryControl = this.fb.control(category);
    categoryArrayControl.push(categoryControl);
  }

  removeCategory(category: string): void {
    const categoryArrayControl = this.billItemControl.get(
      'categories'
    ) as FormArray;
    const index = (categoryArrayControl.value as string[]).indexOf(category);
    if (index >= 0) {
      categoryArrayControl.removeAt(index);
    }
  }

  emptyCategories(): void {
    const categoryArrayControl = this.billItemControl.get(
      'categories'
    ) as FormArray;
    categoryArrayControl.clear();
  }

  onAddCategory(): void {
    const dialog = this.dialog.open(BillItemCategoryDialogComponent, {
      data: {
        category: '',
      },
    });
    dialog.afterClosed().subscribe((category) => {
      if (!category) {
        return;
      }
      const categoryArrayControl = this.billItemControl.get(
        'categories'
      ) as FormArray;
      const categoryControl = this.fb.control(category);
      categoryArrayControl.push(categoryControl);
    });
  }
}
