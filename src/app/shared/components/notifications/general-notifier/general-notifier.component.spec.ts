import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralNotifierComponent } from './general-notifier.component';

describe('GeneralNotifierComponent', () => {
  let component: GeneralNotifierComponent;
  let fixture: ComponentFixture<GeneralNotifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralNotifierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralNotifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
