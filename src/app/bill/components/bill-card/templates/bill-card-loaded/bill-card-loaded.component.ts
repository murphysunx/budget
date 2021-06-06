import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Bill } from '@bill/types/bill';
import { ConfirmationDialogComponent } from '@shared/components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { IGeneralDialogData } from '@shared/components/dialogs/general-dialog/general-dialog.component';
import { NotifierService } from '@shared/components/notifications/notifier.service';

@Component({
  selector: 'bgt-bill-card-loaded',
  templateUrl: './bill-card-loaded.component.html',
  styleUrls: ['./bill-card-loaded.component.scss'],
})
export class BillCardLoadedComponent implements OnInit {
  @Input() cardIndex?: number;
  @Input() bill!: Bill;

  isFavorite = false;

  constructor(private router: Router, private dialog: MatDialog, private notifier: NotifierService) { }

  ngOnInit(): void { }

  onEditBill(): void {
    this.router.navigate([`/edit/${this.bill.id}`]);
  }

  confirmDeleteBill($event: Event): void {
    const dialogData: IGeneralDialogData = {
      title: `Alert`,
      content: `Do you want to delete this bill?`
    };
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(
      (payload) => {
        console.log(`close confirmation dialog`, payload);
        if (!!payload) {
          const notiRef = this.notifier.open({
            data: {
              message: `Bill deleted`,
              action: `Close`
            }
          });
          notiRef.onAction().subscribe(
            action => {
              console.log(`notification action`, action);
            }
          );
        }
      }
    );
  }
}
