import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Bill, IDraftBill } from '../../types/bill';
import { BillFormService } from './bill-form.service';

@Component({
  selector: 'bgt-bill-form',
  templateUrl: './bill-form.component.html',
  styleUrls: ['./bill-form.component.scss'],
  providers: [BillFormService],
})
export class BillFormComponent implements OnInit {
  @Input() bill: Bill | null = null;
  @Output() submitted = new EventEmitter<IDraftBill>();

  constructor(private billFormService: BillFormService) {}

  ngOnInit(): void {
    this.billFormService.loadBillToForm(this.bill);
  }

  get billForm(): FormGroup {
    return this.billFormService.billForm;
  }

  get itemsControl(): FormGroup[] {
    return this.billFormService.itemsControl;
  }

  onSubmit(): void {
    console.log(`[bill-form] Submit bill form`, this.billFormService.billForm);
    const bill = this.billFormService.billForm.value;
    this.submitted.emit(bill);
    this.onResetBillForm();
  }

  onResetBillForm(): void {
    this.billFormService.resetBillForm(this.bill);
  }

  onAddItem(): void {
    this.billFormService.onAddItem();
  }
}
