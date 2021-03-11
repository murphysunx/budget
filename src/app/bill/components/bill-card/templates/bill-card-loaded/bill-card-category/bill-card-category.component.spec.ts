import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillCardCategoryComponent } from './bill-card-category.component';

describe('BillCardCategoryComponent', () => {
  let component: BillCardCategoryComponent;
  let fixture: ComponentFixture<BillCardCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillCardCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillCardCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
