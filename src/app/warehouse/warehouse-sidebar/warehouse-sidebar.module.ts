import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from 'primeng-lts/button';
import { InputTextModule } from 'primeng-lts/inputtext';
import { PanelMenuModule } from 'primeng-lts/panelmenu';
import { WarehouseAddDialogComponent } from './dialogs/warehouse-add-dialog/warehouse-add-dialog.component';
import { WarehouseSidebarComponent } from './warehouse-sidebar.component';

const routes: Routes = [
  {
    path: ``,
    component: WarehouseSidebarComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PanelMenuModule,
    MatDialogModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule
  ],
  declarations: [
    WarehouseSidebarComponent,
    WarehouseAddDialogComponent
  ]
})
export class WarehouseSidebarModule { }
