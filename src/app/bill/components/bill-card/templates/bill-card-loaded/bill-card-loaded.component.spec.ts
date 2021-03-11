import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillCardLoadedComponent } from './bill-card-loaded.component';

describe('BillCardLoadedComponent', () => {
  let component: BillCardLoadedComponent;
  let fixture: ComponentFixture<BillCardLoadedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillCardLoadedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillCardLoadedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
