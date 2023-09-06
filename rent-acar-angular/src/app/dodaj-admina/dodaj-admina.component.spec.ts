import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajAdminaComponent } from './dodaj-admina.component';

describe('DodajAdminaComponent', () => {
  let component: DodajAdminaComponent;
  let fixture: ComponentFixture<DodajAdminaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DodajAdminaComponent]
    });
    fixture = TestBed.createComponent(DodajAdminaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
