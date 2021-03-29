import { Component, OnInit } from '@angular/core';
import { BillService } from '@bill/data/bill.service';
import { IDraftBill } from '@bill/types/bill';

@Component({
  selector: 'bgt-bill-new',
  templateUrl: './bill-new.component.html',
  styleUrls: ['./bill-new.component.scss'],
})
export class BillNewComponent implements OnInit {
  constructor(private billService: BillService) {}

  ngOnInit(): void {}

  createNewBill(bill: IDraftBill): void {
    this.billService.createBill(bill);
  }
}
