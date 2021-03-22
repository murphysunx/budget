import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillItemCategoryDialogComponent } from './bill-item-category-dialog.component';

describe('BillItemCategoryDialogComponent', () => {
  let component: BillItemCategoryDialogComponent;
  let fixture: ComponentFixture<BillItemCategoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillItemCategoryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillItemCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
