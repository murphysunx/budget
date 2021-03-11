import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { SharedModule } from '../shared/share.module';
import { BillCardComponent } from './components/bill-card/bill-card.component';
import { BillCardEmptyComponent } from './components/bill-card/templates/bill-card-empty/bill-card-empty.component';
import { BillCardErrorComponent } from './components/bill-card/templates/bill-card-error/bill-card-error.component';
import { BillCardCategoryListComponent } from './components/bill-card/templates/bill-card-loaded/bill-card-category-list/bill-card-category-list.component';
import { BillCardCategoryComponent } from './components/bill-card/templates/bill-card-loaded/bill-card-category/bill-card-category.component';
import { BillCardLoadedComponent } from './components/bill-card/templates/bill-card-loaded/bill-card-loaded.component';
import { BillCardLoadingComponent } from './components/bill-card/templates/bill-card-loading/bill-card-loading.component';
import { BillListComponent } from './components/bill-list/bill-list.component';
import { BillHomeComponent } from './pages/bill-home/bill-home.component';
import { BillImportComponent } from './pages/bill-import/bill-import.component';

@NgModule({
  declarations: [
    BillCardComponent,
    BillCardEmptyComponent,
    BillCardLoadingComponent,
    BillCardLoadedComponent,
    BillCardErrorComponent,
    BillHomeComponent,
    BillImportComponent,
    BillListComponent,
    BillCardCategoryComponent,
    BillCardCategoryListComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    SharedModule,
    MatChipsModule,
    MatButtonModule,
  ],
  exports: [BillHomeComponent, BillImportComponent],
})
export class BillModule {}
