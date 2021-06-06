import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { WarehouseService } from 'app/warehouse/services/warehouse.service';

@Component({
  selector: 'bgt-warehouse-add-dialog',
  templateUrl: './warehouse-add-dialog.component.html',
  styleUrls: ['./warehouse-add-dialog.component.scss']
})
export class WarehouseAddDialogComponent implements OnInit {

  whseForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialogRef<WarehouseAddDialogComponent>,
    private warehouseService: WarehouseService
  ) { }

  ngOnInit(): void {
    this.whseForm = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      location: this.fb.control(''),
    });
  }

  addWarehouse(): void {
    this.warehouseService.createAndSaveWarehouse(this.whseForm.value['name'], this.whseForm.value['location']);
    this.dialog.close();
  }
}
