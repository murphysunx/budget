import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BillItemCategoryDialogComponent } from '../bill-item-category-dialog/bill-item-category-dialog.component';

@Component({
  selector: 'bgt-bill-item-form',
  templateUrl: './bill-item-form.component.html',
  styleUrls: ['./bill-item-form.component.scss'],
})
export class BillItemFormComponent implements OnInit {
  @Input() billItemControl!: FormGroup;

  constructor(private dialog: MatDialog, private fb: FormBuilder) {}

  ngOnInit(): void {}

  getBillItemPropertyControl(propertyName: string): FormControl {
    return this.billItemControl.get(propertyName) as FormControl;
  }

  getCategoryControlArray(): FormArray {
    return this.billItemControl.get('categories') as FormArray;
  }

  addCategory(category: string): void {
    const categoryArrayControl = this.billItemControl.get(
      'categories'
    ) as FormArray;
    const categoryControl = this.fb.control(category);
    categoryArrayControl.push(categoryControl);
  }

  removeCategory(category: string): void {
    const categoryArrayControl = this.billItemControl.get(
      'categories'
    ) as FormArray;
    const index = (categoryArrayControl.value as string[]).indexOf(category);
    if (index >= 0) {
      categoryArrayControl.removeAt(index);
    }
  }

  emptyCategories(): void {
    const categoryArrayControl = this.billItemControl.get(
      'categories'
    ) as FormArray;
    categoryArrayControl.clear();
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
      const categoryArrayControl = this.billItemControl.get(
        'categories'
      ) as FormArray;
      const categoryControl = this.fb.control(category);
      categoryArrayControl.push(categoryControl);
    });
  }
}
