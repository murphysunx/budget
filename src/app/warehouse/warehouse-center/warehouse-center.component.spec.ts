import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseCenterComponent } from './warehouse-center.component';

describe('WarehouseCenterComponent', () => {
  let component: WarehouseCenterComponent;
  let fixture: ComponentFixture<WarehouseCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseCenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
