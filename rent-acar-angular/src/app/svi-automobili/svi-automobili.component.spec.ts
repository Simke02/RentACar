import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SviAutomobiliComponent } from './svi-automobili.component';

describe('SviAutomobiliComponent', () => {
  let component: SviAutomobiliComponent;
  let fixture: ComponentFixture<SviAutomobiliComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SviAutomobiliComponent]
    });
    fixture = TestBed.createComponent(SviAutomobiliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
