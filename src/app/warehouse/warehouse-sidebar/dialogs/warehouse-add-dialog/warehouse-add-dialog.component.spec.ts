import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseAddDialogComponent } from './warehouse-add-dialog.component';

describe('WarehouseAddDialogComponent', () => {
  let component: WarehouseAddDialogComponent;
  let fixture: ComponentFixture<WarehouseAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseAddDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
