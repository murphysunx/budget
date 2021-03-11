import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillCardCategoryListComponent } from './bill-card-category-list.component';

describe('BillCardCategoryListComponent', () => {
  let component: BillCardCategoryListComponent;
  let fixture: ComponentFixture<BillCardCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillCardCategoryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillCardCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
