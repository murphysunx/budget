import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillCardLoadingComponent } from './bill-card-loading.component';

describe('BillCardLoadingComponent', () => {
  let component: BillCardLoadingComponent;
  let fixture: ComponentFixture<BillCardLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillCardLoadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillCardLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
