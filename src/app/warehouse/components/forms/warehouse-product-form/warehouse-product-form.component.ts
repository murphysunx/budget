import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductFormBuilder } from 'app/product/forms/product-form';
import { IProduct } from 'app/product/types/product';

@Component({
  selector: 'bgt-warehouse-product-form',
  templateUrl: './warehouse-product-form.component.html',
  styleUrls: ['./warehouse-product-form.component.scss']
})
export class WarehouseProductFormComponent implements OnInit {

  @Input() product!: IProduct;
  productForm!: FormGroup;

  productCategories: any[] = [];
  productUnits: any[] = [];

  @Output() confirm = new EventEmitter<Partial<IProduct>>();
  @Output() cancel = new EventEmitter<void>();

  constructor(
    private readonly injector: Injector,
  ) { }

  ngOnInit(): void {
    const pfb = new ProductFormBuilder(this.injector);
    this.productForm = pfb.createProductControl(this.product);
  }

  searchCategory(event: any): void {
    // TODO event.query
  }

  searchUnit(event: any): void {
    // TODO
  }

  onConfirm(): void {
    if (this.productForm.invalid) {
      return;
    }
    this.confirm.emit(this.productForm.value);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
