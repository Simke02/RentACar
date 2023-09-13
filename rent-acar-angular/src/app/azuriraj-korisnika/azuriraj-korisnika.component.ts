import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Korisnik } from '../models/korisnik.model';
import { RezervacijaService } from '../services/rezervacija.service';
import { KorisnikService } from '../services/korisnik.service';

@Component({
  selector: 'app-azuriraj-korisnika',
  templateUrl: './azuriraj-korisnika.component.html',
  styleUrls: ['./azuriraj-korisnika.component.css']
})
export class AzurirajKorisnikaComponent {
  azurirajForm: FormGroup;
  korisnik: Korisnik = {
    id: 0,
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
  token: any = "";
  prikazSifre: string = "password";

  constructor(private loginService: LoginService,
              private rezervacijaService: RezervacijaService,
              private router: Router,
              private korisnikService: KorisnikService){
    this.azurirajForm = new FormGroup({
      'ime': new FormControl(null, Validators.required),
      'prezime': new FormControl(null, Validators.required),
      'telefon': new FormControl(null, Validators.required),
      'drzava': new FormControl(null, Validators.required),
      'grad': new FormControl(null, Validators.required),
      'adresa': new FormControl(null, Validators.required),
      'broj_vozacke': new FormControl(null, Validators.required),
      'jmbg': new FormControl(null),
      'broj_pasosa': new FormControl(null),
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

    this.token = localStorage.getItem('token');
    if(this.token){
    this.loginService.getProfile(this.token).subscribe({
      next: (profil)=>{
        this.korisnik = profil;
        this.azurirajForm.get('ime')?.setValue(profil.ime);
        this.azurirajForm.get('prezime')?.setValue(profil.prezime);
        this.azurirajForm.get('email')?.setValue(profil.email);
        this.azurirajForm.get('telefon')?.setValue(profil.telefon);
        this.azurirajForm.get('drzava')?.setValue(profil.drzava);
        this.azurirajForm.get('grad')?.setValue(profil.grad);
        this.azurirajForm.get('adresa')?.setValue(profil.adresa);
        this.azurirajForm.get('broj_vozacke')?.setValue(profil.broj_vozacke);
        this.azurirajForm.get('sifra')?.setValue(profil.sifra);

        if(profil.drzava == 'Srbija'){
          this.azurirajForm.get('jmbg')?.addValidators(Validators.required);
          this.azurirajForm.get('jmbg')?.setValue(profil.jmbg);
          this.azurirajForm.get('jmbg')?.updateValueAndValidity();
          this.azurirajForm.get('broj_pasosa')?.clearValidators();
          this.azurirajForm.get('broj_pasosa')?.updateValueAndValidity();
        }
        else{
          this.azurirajForm.get('broj_pasosa')?.setValue(profil.broj_pasosa);
          this.azurirajForm.get('broj_pasosa')?.addValidators(Validators.required);
          this.azurirajForm.get('broj_pasosa')?.updateValueAndValidity();
          this.azurirajForm.get('jmbg')?.clearValidators();
          this.azurirajForm.get('jmbg')?.updateValueAndValidity()
        }}
      })
    }
  }

  AzurirajKorisnika(){
    this.korisnik.ime = this.azurirajForm.get('ime')?.value;
    this.korisnik.prezime = this.azurirajForm.get('prezime')?.value;
    this.korisnik.telefon = this.azurirajForm.get('telefon')?.value;
    this.korisnik.drzava = this.azurirajForm.get('drzava')?.value;
    this.korisnik.grad = this.azurirajForm.get('grad')?.value;
    this.korisnik.adresa = this.azurirajForm.get('adresa')?.value;
    this.korisnik.broj_vozacke = this.azurirajForm.get('broj_vozacke')?.value;
    this.korisnik.sifra = this.azurirajForm.get('sifra')?.value;

    if(this.azurirajForm.get('drzava')?.value == 'Srbija')
      this.korisnik.jmbg = this.azurirajForm.get('jmbg')?.value;
    else
      this.korisnik.broj_pasosa = this.azurirajForm.get('broj_pasosa')?.value;

    this.korisnikService.AzurirajKorisnika(this.korisnik.email, this.korisnik, this.token)
    .subscribe({
      next:(azurirani)=>{
        console.log(azurirani);
      }
    })
  }

  priSelekciji(){
    if(this.azurirajForm.get('drzava')?.value == 'Srbija'){
      this.azurirajForm.get('jmbg')?.addValidators(Validators.required);
      this.azurirajForm.get('jmbg')?.updateValueAndValidity();
      this.azurirajForm.get('broj_pasosa')?.clearValidators();
      this.azurirajForm.get('broj_pasosa')?.updateValueAndValidity();
    }
    else{
      this.azurirajForm.get('broj_pasosa')?.addValidators(Validators.required);
      this.azurirajForm.get('broj_pasosa')?.updateValueAndValidity();
      this.azurirajForm.get('jmbg')?.clearValidators();
      this.azurirajForm.get('jmbg')?.updateValueAndValidity()
    }
  }

  odustani(){
    this.router.navigate(['']);
  }

  prikazi(){
    if(this.prikazSifre === "password")
      this.prikazSifre = "text";
    else
      this.prikazSifre = "password"
  }
}
