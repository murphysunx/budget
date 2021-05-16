import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IBillItemDraft } from '@bill/types/bill-item';
import { map } from 'underscore';

export const minLengthArray = (min: number) => {
  return (c: AbstractControl): { [key: string]: any } | null => {
    if (c.value.length >= min) {
      return null;
    }
    return { MinLengthArray: true };
  };
};

@Injectable()
export class BillFormBuilderService {
  constructor(private fb: FormBuilder) { }

  createBillForm(): FormGroup {
    return this.fb.group({
      payer: this.fb.control(null, [Validators.required]),
      payee: this.fb.control(null, [Validators.required]),
      venue: this.fb.control(null),
      payDate: this.fb.control(null, [Validators.required]),
      effectStartDate: this.fb.control(null),
      effectEndDate: this.fb.control(null),
      items: this.fb.array([], [minLengthArray(1)]),
    });
  }

  createBillItemForm(item?: IBillItemDraft): FormGroup {
    return this.fb.group({
      name: this.fb.control(item?.name || null, [Validators.required]),
      price: this.fb.control(item?.price || 0, [Validators.min(0)]),
      categories: this.createBillItemCategoryForm(item?.categories),
      qty: this.fb.control(item?.qty || 0, [Validators.min(0)]),
      cost: this.fb.control(item?.cost || 0, [Validators.min(0), Validators.required]),
      note: this.fb.control(item?.note || ''),
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
