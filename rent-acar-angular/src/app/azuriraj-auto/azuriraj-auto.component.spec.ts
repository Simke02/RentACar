import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzurirajAutoComponent } from './azuriraj-auto.component';

describe('AzurirajAutoComponent', () => {
  let component: AzurirajAutoComponent;
  let fixture: ComponentFixture<AzurirajAutoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AzurirajAutoComponent]
    });
    fixture = TestBed.createComponent(AzurirajAutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
