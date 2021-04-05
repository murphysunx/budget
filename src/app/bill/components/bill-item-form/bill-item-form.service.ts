import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBillItem } from '@bill/types/bill-item';
import { map } from 'underscore';

@Injectable()
export class BillItemFormService {
  billItemControl: FormGroup | null = null;

  constructor(private fb: FormBuilder) {}

  private createBillItemForm(item?: IBillItem): FormGroup {
    return this.fb.group({
      name: this.fb.control(item?.name || null, [Validators.required]),
      price: this.fb.control(item?.price || null, [Validators.min(0)]),
      categories: this.createBillItemCategoryForm(item?.categories),
      qty: this.fb.control(item?.qty || null, [Validators.min(0)]),
      cost: this.fb.control(item?.cost || null, [Validators.min(0)]),
      note: this.fb.control(item?.note || null),
    });
  }

  private createBillItemCategoryForm(categories?: string[]): FormArray {
    return this.fb.array(
      categories ? map(categories, (cat) => this.fb.control(cat)) : []
    );
  }

  createBillItemCtrl(item?: IBillItem): void {
    const ctrl = this.createBillItemForm(item);
    this.billItemControl = ctrl;
  }
}
