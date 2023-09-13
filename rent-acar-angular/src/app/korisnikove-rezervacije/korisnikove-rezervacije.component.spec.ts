import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KorisnikoveRezervacijeComponent } from './korisnikove-rezervacije.component';

describe('KorisnikoveRezervacijeComponent', () => {
  let component: KorisnikoveRezervacijeComponent;
  let fixture: ComponentFixture<KorisnikoveRezervacijeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KorisnikoveRezervacijeComponent]
    });
    fixture = TestBed.createComponent(KorisnikoveRezervacijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
