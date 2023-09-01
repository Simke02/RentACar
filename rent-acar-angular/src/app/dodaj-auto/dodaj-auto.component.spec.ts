import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajAutoComponent } from './dodaj-auto.component';

describe('DodajAutoComponent', () => {
  let component: DodajAutoComponent;
  let fixture: ComponentFixture<DodajAutoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DodajAutoComponent]
    });
    fixture = TestBed.createComponent(DodajAutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
