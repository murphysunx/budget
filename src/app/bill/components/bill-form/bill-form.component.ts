import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Bill, IDraftBill } from '../../types/bill';
import { BillItemContainerDirective } from '../bill-item-form/bill-item-container.directive';
import { BillItemFormComponent } from '../bill-item-form/bill-item-form.component';
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

  @ViewChild(BillItemContainerDirective, { static: true })
  billItemContnerDirctv!: BillItemContainerDirective;

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
    console.log(
      `[bill-form] Submit bill form`,
      this.billFormService.billForm.value
    );
    const bill = this.billFormService.billForm.value;
    this.submitted.emit(bill);
    // this.onResetBillForm();
  }

  onResetBillForm(): void {
    this.billFormService.resetBillForm(this.bill);
    // clean up view
    this.billItemContnerDirctv.cleanBillItems();
  }

  onAddItem(): void {
    // this.billFormService.onAddItem();
    const comp = this.billItemContnerDirctv.addBillItemComponent();
    this.billFormService.onAddItem(comp.billItemControl);
  }

  addBillItem(item: BillItemFormComponent): void {
    const ctrl = item.billItemControl;
  }
}
