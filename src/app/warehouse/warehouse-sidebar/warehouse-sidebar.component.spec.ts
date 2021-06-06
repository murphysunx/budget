import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseSidebarComponent } from './warehouse-sidebar.component';

describe('WarehouseSidebarComponent', () => {
  let component: WarehouseSidebarComponent;
  let fixture: ComponentFixture<WarehouseSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
