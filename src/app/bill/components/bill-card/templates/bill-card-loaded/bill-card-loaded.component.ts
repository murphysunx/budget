import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bill } from '@bill/types/bill';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'bgt-bill-card-loaded',
  templateUrl: './bill-card-loaded.component.html',
  styleUrls: ['./bill-card-loaded.component.scss'],
})
export class BillCardLoadedComponent implements OnInit {
  @Input() cardIndex?: number;
  @Input() bill!: Bill;

  isFavorite = false;

  constructor(private router: Router, private confirmationService: ConfirmationService) { }

  ngOnInit(): void { }

  onEditBill(): void {
    this.router.navigate([`/edit/${this.bill.id}`]);
  }

  confirmDeleteBill($event: Event): void {
    this.confirmationService.confirm({
      target: $event.target as EventTarget,
      message: `Do you want to delete this bill?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => { },
      reject: () => { },
    })
  }
}
