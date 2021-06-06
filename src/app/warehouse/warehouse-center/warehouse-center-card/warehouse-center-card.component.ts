import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogComponent } from '@shared/components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { NotifierService } from '@shared/components/notifications/notifier.service';
import { IWarehouse } from 'app/warehouse/interfaces/warehouse';
import { MenuItem } from 'primeng-lts/api';

@Component({
  selector: 'bgt-warehouse-center-card',
  templateUrl: './warehouse-center-card.component.html',
  styleUrls: ['./warehouse-center-card.component.scss']
})
export class WarehouseCenterCardComponent implements OnInit {
  productSaleData: any;
  chartOption: any;

  actions: MenuItem[] = [];

  @Input() warehouse!: IWarehouse;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private notifier: NotifierService
  ) { }

  ngOnInit(): void {
    this.productSaleData = {
      labels: [`手提袋`, `无纺布袋`],
      datasets: [
        {
          label: `销售数据`,
          backgroundColor: `blue`,
          data: [200, 300]
        },
        {
          label: `进货数据`,
          backgroundColor: `red`,
          data: [500, 900]
        },
      ]
    };
    this.chartOption = {
      title: {
        display: true,
        text: this.warehouse.name,
        fontSize: 16
      },
      legend: {
        position: 'bottom'
      },
      scales: {
        yAxes: [
          {
            display: true,
            ticks: {
              suggestedMin: 0,
            }
          }
        ]
      },
    };
    this.actions = [
      {
        label: 'Rename', icon: 'pi pi-refresh', command: () => {
          this.renameWarehouse();
        }
      },
      { separator: true },
      {
        label: 'Delete', icon: 'pi pi-times', command: () => {
          this.intentToDeleteWarehouse();
        }
      },
    ];
  }

  viewWarehouse(): void {
    this.router.navigate([`./${this.warehouse.id}`], { relativeTo: this.route });
  }

  renameWarehouse(): void {
    this.notifier.open({
      data: {
        message: `Rename warehouse - TODO`,
      },
      duration: 1000
    });
  }

  intentToDeleteWarehouse(): void {
    const ref = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: `Confirmation`,
        content: `Do you want to delete this warehoue - ${this.warehouse.name}`
      }
    });
    ref.afterClosed().subscribe(
      ans => {
        if (ans) {
          this.deleteThisWarehoue();
        }
      }
    );
  }

  deleteThisWarehoue(): void {
    this.notifier.open({
      data: {
        message: `${this.warehouse.name} deleted`
      },
      duration: 1000
    });
  }
}
