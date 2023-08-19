import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsiguranjeComponent } from './osiguranje.component';

describe('OsiguranjeComponent', () => {
  let component: OsiguranjeComponent;
  let fixture: ComponentFixture<OsiguranjeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OsiguranjeComponent]
    });
    fixture = TestBed.createComponent(OsiguranjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
