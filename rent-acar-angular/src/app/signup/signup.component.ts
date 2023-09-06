import { Component } from '@angular/core';
import { KorisnikService } from '../services/korisnik.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { KorisnikD } from '../models/korisnik.model';
import { RezervacijaService } from '../services/rezervacija.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  korisnik: KorisnikD = {
    email: "",
    sifra: "",
    ime: "",
    prezime: "",
    jmbg: "",
    drzava: "",
    grad: "",
    adresa: "",
    telefon: "",
    broj_pasosa: "",
    broj_vozacke: ""
  };
  drzave: string[] = [];

  constructor(private korisnikService: KorisnikService,
              private rezervacijaService: RezervacijaService,
              private router: Router){
    this.signupForm = new FormGroup({
      'ime': new FormControl(null, Validators.required),
      'prezime': new FormControl(null, Validators.required),
      'telefon': new FormControl(null, Validators.required),
      'drzava': new FormControl(null, Validators.required),
      'grad': new FormControl(null, Validators.required),
      'adresa': new FormControl(null, Validators.required),
      'broj_vozacke': new FormControl(null, Validators.required),
      'jmbg': new FormControl(null),
      'broj_pasosa': new FormControl(null),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'sifra': new FormControl(null, Validators.required)
    })
  }

  ngOnInit(){
    this.rezervacijaService.ProcitajDrzave()
    .subscribe({
      next: (drzave) => {
        for (const drzava of drzave.split(/[\r\n]+/)){
          this.drzave.push(drzava);
        }
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  DodajKorisnika(){
    this.korisnik.ime = this.signupForm.get('ime')?.value;
    this.korisnik.prezime = this.signupForm.get('prezime')?.value;
    this.korisnik.email = this.signupForm.get('email')?.value;
    this.korisnik.telefon = this.signupForm.get('telefon')?.value;
    this.korisnik.drzava = this.signupForm.get('drzava')?.value;
    this.korisnik.grad = this.signupForm.get('grad')?.value;
    this.korisnik.adresa = this.signupForm.get('adresa')?.value;
    this.korisnik.broj_vozacke = this.signupForm.get('broj_vozacke')?.value;
    this.korisnik.sifra = this.signupForm.get('sifra')?.value;

    if(this.signupForm.get('drzava')?.value == 'Srbija')
      this.korisnik.jmbg = this.signupForm.get('jmbg')?.value;
    else
      this.korisnik.broj_pasosa = this.signupForm.get('broj_pasosa')?.value;

    this.korisnikService.DodajKorisnika(this.korisnik)
    .subscribe({
      next:(dodati)=>{
        console.log(dodati);
      }
    })
  }

  priSelekciji(){
    if(this.signupForm.get('drzava')?.value == 'Srbija'){
      this.signupForm.get('jmbg')?.addValidators(Validators.required);
      this.signupForm.get('jmbg')?.updateValueAndValidity();
      this.signupForm.get('broj_pasosa')?.clearValidators();
      this.signupForm.get('broj_pasosa')?.updateValueAndValidity();
    }
    else{
      this.signupForm.get('broj_pasosa')?.addValidators(Validators.required);
      this.signupForm.get('broj_pasosa')?.updateValueAndValidity();
      this.signupForm.get('jmbg')?.clearValidators();
      this.signupForm.get('jmbg')?.updateValueAndValidity()
    }
  }

  odustani(){
    this.router.navigate(['/login']);
  }
}
