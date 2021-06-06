import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseProductDetailComponent } from './warehouse-product-detail.component';

describe('WarehouseProductDetailComponent', () => {
  let component: WarehouseProductDetailComponent;
  let fixture: ComponentFixture<WarehouseProductDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseProductDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
