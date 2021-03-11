import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillImportComponent } from './bill-import.component';

describe('BillImportComponent', () => {
  let component: BillImportComponent;
  let fixture: ComponentFixture<BillImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillImportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
