import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseCenterCardComponent } from './warehouse-center-card.component';

describe('WarehouseCenterCardComponent', () => {
  let component: WarehouseCenterCardComponent;
  let fixture: ComponentFixture<WarehouseCenterCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseCenterCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseCenterCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
