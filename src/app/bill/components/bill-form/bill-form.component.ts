import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import * as dayjs from 'dayjs';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ErrorService } from 'src/app/core/errors/error.service';
import { BillService } from '../../data/bill.service';
import { IBill, IDraftBill } from '../../types/bill';

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

  constructor(
    private fb: FormBuilder,
    private errorService: ErrorService,
    private billService: BillService
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
}
