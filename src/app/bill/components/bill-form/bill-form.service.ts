import { Injectable, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Bill } from '@bill/types/bill';
import { IBillItem } from '@bill/types/bill-item';
import { ErrorService } from '@core/errors/error.service';
import * as dayjs from 'dayjs';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { each, map } from 'underscore';

@Injectable()
export class BillFormService implements OnDestroy {
  private destroy$ = new Subject();

  bill: Bill | null = null;

  billForm = this.fb.group({
    payer: this.fb.control(null, [Validators.required]),
    payee: this.fb.control(null, [Validators.required]),
    venue: this.fb.control(null),
    payDate: this.fb.control(null, [Validators.required]),
    effectStartDate: this.fb.control(null),
    effectEndDate: this.fb.control(null),
    items: this.fb.array([]),
  });

  constructor(private fb: FormBuilder, private errorService: ErrorService) {
    this.billForm
      .get('payDate')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        (value) => this.handlePayDateUpdate(value),
        (err) => this.handlePayDateUpdateError(err)
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get itemsControl(): FormGroup[] {
    return (this.billForm.get('items') as FormArray).controls as FormGroup[];
  }

  loadBillToForm(bill: Bill | null): void {
    if (!bill) {
      return;
    }
    this.bill = bill;
    this.billForm.patchValue({
      ...bill,
      payDate: dayjs(bill.payDate).toDate(),
      effectStartDate: bill.effectStartDate
        ? dayjs(bill.effectStartDate).toDate()
        : null,
      effectEndDate: bill.effectEndDate
        ? dayjs(bill.effectEndDate).toDate()
        : null,
    });
    const itemsArray = this.billForm.get('items') as FormArray;
    if (bill?.items) {
      each(bill.items, (item) => {
        const itemControl = this.createBillItemForm(item || null);
        itemsArray.push(itemControl);
      });
    }
  }

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

  private handlePayDateUpdate(value: any): void {
    const startCtrl = this.billForm.get('effectStartDate');
    const endCtrl = this.billForm.get('effectEndDate');
    if (!startCtrl || !endCtrl) {
      this.errorService.catchError(
        `[bill-form] effect date range controls are not initialized.`
      );
      return;
    }
    if (this.isEffectDateRangeSyncable(this.bill, startCtrl, endCtrl)) {
      startCtrl.setValue(value);
      endCtrl.setValue(value);
    }
  }

  private isEffectDateRangeSyncable(
    originBill: Bill | null,
    startCtrl: AbstractControl,
    endCtrl: AbstractControl
  ): boolean {
    if (!originBill) {
      return true;
    }
    if (
      !originBill.effectStartDate &&
      !originBill.effectEndDate &&
      startCtrl.pristine &&
      endCtrl.pristine
    ) {
      return true;
    }
    return false;
  }

  private handlePayDateUpdateError(err: any): void {
    this.errorService.catchError(err);
  }

  resetBillForm(bill: Bill | null): void {
    this.billForm.reset();
    const itemsArray = this.billForm.get('items') as FormArray;
    itemsArray.clear();
    this.loadBillToForm(bill);
  }

  onAddItem(ctrl: FormGroup): void {
    const itemsArray = this.billForm.get('items') as FormArray;
    itemsArray.push(ctrl);
  }
}
