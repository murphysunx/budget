import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { AutoCompleteModule } from 'primeng-lts/autocomplete';
import { ButtonModule } from 'primeng-lts/button';
import { ChartModule } from 'primeng-lts/chart';
import { InputNumberModule } from 'primeng-lts/inputnumber';
import { InputTextModule } from 'primeng-lts/inputtext';
import { SplitButtonModule } from 'primeng-lts/splitbutton';
import { TableModule } from 'primeng-lts/table';
import { ToolbarModule } from 'primeng-lts/toolbar';
import { WarehouseProductFormComponent } from './components/forms/warehouse-product-form/warehouse-product-form.component';
import { WarehouseCenterCardComponent } from './warehouse-center/warehouse-center-card/warehouse-center-card.component';
import { WarehouseCenterComponent } from './warehouse-center/warehouse-center.component';
import { WarehouseDetailComponent } from './warehouse-detail/warehouse-detail.component';
import { WarehouseProductDetailComponent } from './warehouse-detail/warehouse-product-detail/warehouse-product-detail.component';
import { WarehouseRoutingModule } from './warehouse-routing.module';

@NgModule({
  imports: [
    CommonModule,
    WarehouseRoutingModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatSortModule,
    MatGridListModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    ChartModule,
    ButtonModule,
    SplitButtonModule,
    TableModule,
    InputTextModule,
    ToolbarModule,
    AutoCompleteModule,
    InputNumberModule,
    ReactiveFormsModule,
  ],
  declarations: [
    WarehouseCenterComponent,
    WarehouseDetailComponent,
    WarehouseProductDetailComponent,
    WarehouseCenterCardComponent,
    WarehouseProductFormComponent,
  ],
  providers: []
})
export class WarehouseModule { }
