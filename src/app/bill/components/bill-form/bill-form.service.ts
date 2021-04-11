import { Injectable, OnDestroy } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { Bill } from '@bill/types/bill';
import { ErrorService } from '@core/errors/error.service';
import * as dayjs from 'dayjs';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { each, pairs } from 'underscore';
import { BillFormBuilderService } from '../services/bill-form-builder.service';

@Injectable()
export class BillFormService implements OnDestroy {
  private destroy$ = new Subject();

  bill: Bill | null = null;

  billForm = this.billFormBuilderService.createBillForm();

  constructor(
    private errorService: ErrorService,
    private billFormBuilderService: BillFormBuilderService
  ) {
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
    // const itemsArray = this.billForm.get('items') as FormArray;
    // if (bill?.items) {
    //   each(bill.items, (item) => {
    //     const itemControl = this.billFormBuilderService.createBillItemForm(
    //       item || null
    //     );
    //     itemsArray.push(itemControl);
    //   });
    // }
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

  isReadyToAddItem(): boolean {
    const controls = this.billForm.controls;
    for (const contr of pairs(controls)) {
      const [key, val] = contr;
      if (key === 'items' || val.valid) {
        continue;
      } else {
        return false;
      }
    }
    return true;
  }
}
