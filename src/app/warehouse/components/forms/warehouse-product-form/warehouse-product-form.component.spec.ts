import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseProductFormComponent } from './warehouse-product-form.component';

describe('WarehouseProductFormComponent', () => {
  let component: WarehouseProductFormComponent;
  let fixture: ComponentFixture<WarehouseProductFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseProductFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
