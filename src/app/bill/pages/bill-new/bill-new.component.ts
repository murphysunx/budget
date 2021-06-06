import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BillFormComponent } from '@bill/components/bill-form/bill-form.component';
import { BillService } from '@bill/data/bill.service';
import { Bill, IDraftBill } from '@bill/types/bill';
import { IBillItemDraft } from '@bill/types/bill-item';

@Component({
  selector: 'bgt-bill-new',
  templateUrl: './bill-new.component.html',
  styleUrls: ['./bill-new.component.scss'],
})
export class BillNewComponent implements OnInit {
  @ViewChild(BillFormComponent, { static: true }) billForm!: BillFormComponent;

  constructor(private billService: BillService, private route: Router) { }

  ngOnInit(): void { }

  createNewBill(event: { bill: IDraftBill, items: IBillItemDraft[] }): void {
    // tslint:disable-next-line: deprecation
    const { bill, items } = event;
    this.billService.createBill(bill, items).subscribe(
      (resp) => {
        this.onBillCreated(resp);
      }
    );
  }

  private onBillCreated(bill: Bill): void {
    // this.confirmationService.confirm({
    //   message: `Do you like to continue to make more bills?`,
    //   accept: () => {
    //     this.billForm.onResetBillForm();
    //   },
    //   reject: () => {
    //     this.route.navigate([`/home`]);
    //   }
    // });
  }
}
