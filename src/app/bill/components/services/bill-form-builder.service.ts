import { Injectable } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IBillItem } from '@bill/types/bill-item';
import { map } from 'underscore';

@Injectable()
export class BillFormBuilderService {
  constructor(private fb: FormBuilder) {}

  createBillForm(): FormGroup {
    return this.fb.group({
      payer: this.fb.control(null, [Validators.required]),
      payee: this.fb.control(null, [Validators.required]),
      venue: this.fb.control(null),
      payDate: this.fb.control(null, [Validators.required]),
      effectStartDate: this.fb.control(null),
      effectEndDate: this.fb.control(null),
      items: this.fb.array([]),
    });
  }

  createBillItemForm(item?: IBillItem): FormGroup {
    return this.fb.group({
      name: this.fb.control(item?.name || null, [Validators.required]),
      price: this.fb.control(item?.price || null, [Validators.min(0)]),
      categories: this.createBillItemCategoryForm(item?.categories),
      qty: this.fb.control(item?.qty || null, [Validators.min(0)]),
      cost: this.fb.control(item?.cost || null, [Validators.min(0)]),
      note: this.fb.control(item?.note || null),
    });
  }

  createBillItemCategoryForm(categories?: string[]): FormArray {
    return this.fb.array(
      categories ? map(categories, (cat) => this.fb.control(cat)) : []
    );
  }

  createCategoryControl(category: string): FormControl {
    return this.fb.control(category);
  }
}
