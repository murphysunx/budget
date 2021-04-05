import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '@shared/share.module';
import { BillRoutingModule } from './bill-routing.module';
import { BillCardComponent } from './components/bill-card/bill-card.component';
import { BillCardEmptyComponent } from './components/bill-card/templates/bill-card-empty/bill-card-empty.component';
import { BillCardErrorComponent } from './components/bill-card/templates/bill-card-error/bill-card-error.component';
import { BillCardCategoryListComponent } from './components/bill-card/templates/bill-card-loaded/bill-card-category-list/bill-card-category-list.component';
import { BillCardCategoryComponent } from './components/bill-card/templates/bill-card-loaded/bill-card-category/bill-card-category.component';
import { BillCardLoadedComponent } from './components/bill-card/templates/bill-card-loaded/bill-card-loaded.component';
import { BillCardLoadingComponent } from './components/bill-card/templates/bill-card-loading/bill-card-loading.component';
import { BillFormComponent } from './components/bill-form/bill-form.component';
import { BillItemCategoryDialogComponent } from './components/bill-item-category-dialog/bill-item-category-dialog.component';
import { BillItemFormComponent } from './components/bill-item-form/bill-item-form.component';
import { BillListComponent } from './components/bill-list/bill-list.component';
import { BillHomeComponent } from './pages/bill-home/bill-home.component';
import { BillImportComponent } from './pages/bill-import/bill-import.component';
import { BillNewComponent } from './pages/bill-new/bill-new.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BillItemContainerDirective } from './components/bill-item-form/bill-item-container.directive';
import { BillEditComponent } from './pages/bill-edit/bill-edit.component';

@NgModule({
  declarations: [
    BillCardComponent,
    BillCardEmptyComponent,
    BillCardLoadingComponent,
    BillCardLoadedComponent,
    BillCardErrorComponent,
    BillImportComponent,
    BillHomeComponent,
    BillListComponent,
    BillCardCategoryComponent,
    BillCardCategoryListComponent,
    BillFormComponent,
    BillNewComponent,
    BillItemFormComponent,
    BillItemCategoryDialogComponent,
    BillItemContainerDirective,
    BillEditComponent,
  ],
  imports: [
    CommonModule,
    BillRoutingModule,
    MatCardModule,
    SharedModule,
    MatChipsModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    MatDialogModule,
    MatIconModule,
    MatSlideToggleModule,
  ],
  exports: [BillHomeComponent, BillImportComponent, BillNewComponent],
})
export class BillModule {}
