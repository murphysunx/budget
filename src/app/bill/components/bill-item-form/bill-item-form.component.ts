import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { IBillItemDraft } from '@bill/types/bill-item';
import { ChipsAutocompleteComponent } from '@shared/components/chips-autocomplete/chips-autocomplete.component';
import { each } from 'underscore';
import { BillItemCategoryDialogComponent } from '../bill-item-category-dialog/bill-item-category-dialog.component';
import { BillItemFormService } from './bill-item-form.service';

@Component({
  selector: 'bgt-bill-item-form',
  templateUrl: './bill-item-form.component.html',
  styleUrls: ['./bill-item-form.component.scss'],
  providers: [BillItemFormService],
})
export class BillItemFormComponent implements OnInit {
  @ViewChild('itemCategoryInput', { static: true })
  itemCategoryInput!: ChipsAutocompleteComponent;

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

  loadBillItem(item: IBillItemDraft): void {
    this.billItemFormService.loadBillItem(item);
    if (!!item.categories && item.categories.length > 0) {
      each(item.categories, (it) => {
        this.itemCategoryInput.addItem(it);
      });
    }
    if (item.qty !== undefined && item.price !== undefined) {
      this.showDetails = true;
    }
  }

  toggleDetail(): void {
    if (this.showDetails) {
      this.billItemFormService.turnOffBillItemDetail();
    }
    this.showDetails = !this.showDetails;
  }

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
