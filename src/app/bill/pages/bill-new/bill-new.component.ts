import { Component, OnInit, ViewChild } from '@angular/core';
import { BillFormComponent } from '@bill/components/bill-form/bill-form.component';
import { BillService } from '@bill/data/bill.service';
import { IDraftBill } from '@bill/types/bill';

@Component({
  selector: 'bgt-bill-new',
  templateUrl: './bill-new.component.html',
  styleUrls: ['./bill-new.component.scss'],
})
export class BillNewComponent implements OnInit {
  @ViewChild(BillFormComponent, { static: true }) billForm!: BillFormComponent;

  constructor(private billService: BillService) {}

  ngOnInit(): void {}

  createNewBill(bill: IDraftBill): void {
    this.billService.createBill(bill);
    this.billForm.onResetBillForm();
  }
}
