import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ErrorService } from 'src/app/core/errors/error.service';
import { IBill } from '../../types/bill';

@Component({
  selector: 'bgt-bill-form',
  templateUrl: './bill-form.component.html',
  styleUrls: ['./bill-form.component.scss'],
})
export class BillFormComponent implements OnInit, OnDestroy {
  private destory$ = new Subject();

  @Input() bill: IBill | null = null;

  billForm = this.fb.group({
    payer: new FormControl(null, [Validators.required]),
    payee: new FormControl(null, [Validators.required]),
    venue: new FormControl(null),
    payDate: new FormControl(null, [Validators.required]),
    effectStartDate: new FormControl(null),
    effectEndDate: new FormControl(null),
  });

  constructor(private fb: FormBuilder, private errorService: ErrorService) {}

  ngOnInit(): void {
    if (!!this.bill) {
      this.billForm.patchValue(this.bill);
    }
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
  }

  private handlePayDateUpdate(value: any): void {
    if (
      !this.billForm.get('effectStartDate')?.value &&
      !this.billForm.get('effectEndDate')?.value
    ) {
      console.log(`[bill-form] this`, this);
      console.log(`[bill-form] value`, value);
      this.billForm.get('effectStartDate')?.setValue(value);
      this.billForm.get('effectEndDate')?.setValue(value);
    }
  }

  private handlePayDateUpdateError(err: any): void {
    this.errorService.catchError(err);
  }
}
