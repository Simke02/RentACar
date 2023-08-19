import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomobiliComponent } from './automobili.component';

describe('AutomobiliComponent', () => {
  let component: AutomobiliComponent;
  let fixture: ComponentFixture<AutomobiliComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutomobiliComponent]
    });
    fixture = TestBed.createComponent(AutomobiliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
