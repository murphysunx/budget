import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface IBillItemCategoryDialogData {
  category: string;
}

@Component({
  selector: 'bgt-bill-item-category-dialog',
  templateUrl: './bill-item-category-dialog.component.html',
  styleUrls: ['./bill-item-category-dialog.component.scss'],
})
export class BillItemCategoryDialogComponent implements OnInit {
  category = '';

  constructor(
    private dialogRef: MatDialogRef<BillItemCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IBillItemCategoryDialogData
  ) {}

  ngOnInit(): void {
    this.category = this.data.category;
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
