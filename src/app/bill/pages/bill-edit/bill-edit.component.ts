import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bill, IDraftBill } from '@bill/types/bill';
import { IBillItemDraft } from '@bill/types/bill-item';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'bgt-bill-edit',
  templateUrl: './bill-edit.component.html',
  styleUrls: ['./bill-edit.component.scss'],
})
export class BillEditComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();

  @Input() bill?: Bill | null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.bill = data['bill'];
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(bill: { bill: IDraftBill; items: IBillItemDraft[]; }): void { }
}
