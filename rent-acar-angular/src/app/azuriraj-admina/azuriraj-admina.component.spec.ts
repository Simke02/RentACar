import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzurirajAdminaComponent } from './azuriraj-admina.component';

describe('AzurirajAdminaComponent', () => {
  let component: AzurirajAdminaComponent;
  let fixture: ComponentFixture<AzurirajAdminaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AzurirajAdminaComponent]
    });
    fixture = TestBed.createComponent(AzurirajAdminaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
