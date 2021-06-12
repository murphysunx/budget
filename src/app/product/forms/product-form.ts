import { Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProduct } from '../types/product';

export class ProductFormBuilder {
  fb: FormBuilder;

  constructor(private injector: Injector) {
    this.fb = this.injector.get(FormBuilder);
  }

  createProductControl(product?: IProduct): FormGroup {
    const formControl = this.fb.group({
      code: this.fb.control(product ? product.code : null, [Validators.required]),
      name: this.fb.control(product ? product.name : null, [Validators.required]),
      category: this.fb.control(product ? product.category : null),
      quantity: this.fb.control(product ? product.quantity : null, [Validators.required]),
      unit: this.fb.control(product ? product.unit : null),
      packSize: this.fb.control(product ? product.packSize : null),
    });
    return formControl;
  }
}
