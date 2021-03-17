import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FareCalculationComponent } from './fare-calculation.component';

describe('FareCalculationComponent', () => {
  let component: FareCalculationComponent;
  let fixture: ComponentFixture<FareCalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FareCalculationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FareCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
