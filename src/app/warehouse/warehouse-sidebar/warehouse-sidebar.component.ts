import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MenuItem } from 'primeng-lts/api';
import { WarehouseAddDialogComponent } from './dialogs/warehouse-add-dialog/warehouse-add-dialog.component';

@Component({
  selector: 'bgt-warehouse-sidebar',
  templateUrl: './warehouse-sidebar.component.html',
  styleUrls: ['./warehouse-sidebar.component.scss']
})
export class WarehouseSidebarComponent implements OnInit {

  items: MenuItem[] = [];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.items = [
      {
        label: `New`,
        icon: `pi pi-fw pi-plus`,
        command: (event) => {
          const addDialog = this.dialog.open(WarehouseAddDialogComponent);
        }
      }
    ];
  }

}
