import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { map, each } from 'underscore';
import * as dayjs from 'dayjs';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ErrorService } from '@core/errors/error.service';
import { BillService } from '../../data/bill.service';
import { IBill, IDraftBill } from '../../types/bill';
import { IBillItem } from '@bill/types/bill-item';
import { MatDialog } from '@angular/material/dialog';
import { BillItemCategoryDialogComponent } from '../bill-item-category-dialog/bill-item-category-dialog.component';

@Component({
  selector: 'bgt-bill-form',
  templateUrl: './bill-form.component.html',
  styleUrls: ['./bill-form.component.scss'],
})
export class BillFormComponent implements OnInit, OnDestroy {
  private destory$ = new Subject();

  @Input() bill: IBill | null = null;
  @Output() finishEdit = new EventEmitter<IDraftBill>();

  billForm = this.fb.group({
    payer: this.fb.control(null, [Validators.required]),
    payee: this.fb.control(null, [Validators.required]),
    venue: this.fb.control(null),
    payDate: this.fb.control(null, [Validators.required]),
    effectStartDate: this.fb.control(null),
    effectEndDate: this.fb.control(null),
    items: this.fb.array([]),
  });

  getItemPropertyControl(
    itemControl: AbstractControl,
    prop: string
  ): FormControl {
    return itemControl.get(prop) as FormControl;
  }

  get itemsControl() {
    return (this.billForm.get('items') as FormArray).controls;
  }

  getItemCategoriesAt(index: number) {
    if (this.billForm.get('items')?.value.length < index) {
      return [];
    }
    return this.billForm.get(`items.${index}.categories`)?.value || [];
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

  constructor(
    private fb: FormBuilder,
    private errorService: ErrorService,
    private billService: BillService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadBillToForm(this.bill);
    this.billForm
      .get('payDate')
      ?.valueChanges.pipe(takeUntil(this.destory$))
      .subscribe(
        (value) => this.handlePayDateUpdate(value),
        (err) => this.handlePayDateUpdateError(err)
      );
  }

  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }

  onSubmit(): void {
    console.log(`[bill-form] Submit bill form`, this.billForm);
    const bill = this.billService.draftBill(this.billForm.value);
    this.finishEdit.emit(bill);
  }

  private loadBillToForm(bill: IBill | null): void {
    if (!bill) {
      return;
    }
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
    originBill: IBill | null,
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

  onResetBillForm(): void {
    this.billForm.reset();
    this.loadBillToForm(this.bill);
  }

  onAddCategory(itemIndex: number): void {
    const dialog = this.dialog.open(BillItemCategoryDialogComponent, {
      data: {
        category: '',
      },
    });
    dialog.afterClosed().subscribe((category) => {
      if (!category) {
        return;
      }
      const categoryArrayControl = this.billForm.get(
        `items.${itemIndex}.categories`
      ) as FormArray;
      const categoryControl = this.fb.control(category);
      categoryArrayControl.push(categoryControl);
    });
  }

  onAddItem(): void {
    const itemFormGroup = this.createBillItemForm();
    const itemsArray = this.billForm.get('items') as FormArray;
    itemsArray.push(itemFormGroup);
  }

  getBillItemControl(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }
}
