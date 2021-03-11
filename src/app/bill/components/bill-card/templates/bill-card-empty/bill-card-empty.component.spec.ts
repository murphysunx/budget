import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillCardEmptyComponent } from './bill-card-empty.component';

describe('BillCardEmptyComponent', () => {
  let component: BillCardEmptyComponent;
  let fixture: ComponentFixture<BillCardEmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillCardEmptyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillCardEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
