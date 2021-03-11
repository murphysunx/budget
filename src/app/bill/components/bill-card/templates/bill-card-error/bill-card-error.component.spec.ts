import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillCardErrorComponent } from './bill-card-error.component';

describe('BillCardErrorComponent', () => {
  let component: BillCardErrorComponent;
  let fixture: ComponentFixture<BillCardErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillCardErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillCardErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
