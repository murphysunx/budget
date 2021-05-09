import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BillItem, IBillItemDraft } from '@bill/types/bill-item';
import { each } from 'underscore';
import { Bill, IDraftBill } from '../../types/bill';
import { BillItemContainerDirective } from '../bill-item-form/bill-item-container.directive';
import { BillFormBuilderService } from '../services/bill-form-builder.service';
import { BillFormService } from './bill-form.service';

@Component({
  selector: 'bgt-bill-form',
  templateUrl: './bill-form.component.html',
  styleUrls: ['./bill-form.component.scss'],
  providers: [BillFormBuilderService, BillFormService],
})
export class BillFormComponent implements OnInit {
  @Input() bill: Bill | null = null;
  @Input() items: BillItem[] | null = null;
  @Output() submitted = new EventEmitter<{ bill: IDraftBill, items: IBillItemDraft[] }>();

  @ViewChild(BillItemContainerDirective, { static: true })
  billItemContnerDirctv!: BillItemContainerDirective;

  constructor(private billFormService: BillFormService) { }

  ngOnInit(): void {
    this.billFormService.loadBillToForm(this.bill);
    if (!!this.bill && !!this.items && this.items.length > 0) {
      each(this.items, (item) => {
        this.onAddItem(item);
      });
    }
  }

  get billForm(): FormGroup {
    return this.billFormService.billForm;
  }

  get itemsControl(): FormGroup[] {
    return this.billFormService.itemsControl;
  }

  onSubmit(): void {
    console.log(
      `[bill-form] Submit bill form`,
      this.billFormService.billForm.value
    );
    const formVal = this.billFormService.billForm.value;
    const { items, payer, payee, venue, payDate, effectStartDate, effectEndDate } = formVal;
    const bill = { payer, payee, venue, payDate, effectStartDate, effectEndDate };
    this.submitted.emit({ bill, items });
    // this.onResetBillForm();
  }

  onResetBillForm(): void {
    this.billFormService.resetBillForm(this.bill);
    // clean up view
    this.billItemContnerDirctv.cleanBillItems();
  }

  onAddItem(item?: IBillItemDraft): void {
    // this.billFormService.onAddItem();
    const comp = this.billItemContnerDirctv.addBillItemComponent(item);
    this.billFormService.onAddItem(comp.billItemControl);
  }

  isReadyToAddItem(): boolean {
    return this.billFormService.isReadyToAddItem();
  }
}
