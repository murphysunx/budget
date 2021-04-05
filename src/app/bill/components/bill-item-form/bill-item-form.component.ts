import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BillItemCategoryDialogComponent } from '../bill-item-category-dialog/bill-item-category-dialog.component';
import { BillItemFormService } from './bill-item-form.service';

@Component({
  selector: 'bgt-bill-item-form',
  templateUrl: './bill-item-form.component.html',
  styleUrls: ['./bill-item-form.component.scss'],
  providers: [BillItemFormService],
})
export class BillItemFormComponent implements OnInit {
  showDetails = false;

  get billItemControl(): FormGroup {
    return this.billItemFormService.billItemControl as FormGroup;
  }

  constructor(
    private dialog: MatDialog,
    private billItemFormService: BillItemFormService
  ) {
    this.billItemFormService.createBillItemCtrl();
  }

  ngOnInit(): void {}

  getBillItemPropertyControl(propertyName: string): FormControl {
    return this.billItemControl.get(propertyName) as FormControl;
  }

  getCategoryControlArray(): FormArray {
    return this.billItemControl.get('categories') as FormArray;
  }

  addCategory(category: string): void {
    this.billItemFormService.addCategory(category);
  }

  removeCategory(category: string): void {
    this.billItemFormService.removeCategory(category);
  }

  emptyCategories(): void {
    this.billItemFormService.emptyCategories();
  }

  onAddCategory(): void {
    const dialog = this.dialog.open(BillItemCategoryDialogComponent, {
      data: {
        category: '',
      },
    });
    dialog.afterClosed().subscribe((category) => {
      if (!category) {
        return;
      }
      this.addCategory(category);
    });
  }
}
