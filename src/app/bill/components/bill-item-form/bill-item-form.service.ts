import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable()
export class BillItemFormService {
  billItemControl!: FormGroup;

  constructor() {}
}
