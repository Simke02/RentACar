import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RezervacijaService } from '../services/rezervacija.service';
import { LoginService } from '../services/login.service';
import { AdministratorService } from '../services/administrator.service';
import { Administrator } from '../models/administrator.model';

@Component({
  selector: 'app-azuriraj-admina',
  templateUrl: './azuriraj-admina.component.html',
  styleUrls: ['./azuriraj-admina.component.css']
})
export class AzurirajAdminaComponent {
  azurirajForm: FormGroup;
  administrator: Administrator = {
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
    pozicija: ""
  };
  drzave: string[] = [];
  token: any = "";
  prikazSifre: string = "password";

  constructor(private loginService: LoginService,
              private rezervacijaService: RezervacijaService,
              private router: Router,
              private administratorService: AdministratorService){
    this.azurirajForm = new FormGroup({
      'ime': new FormControl(null, Validators.required),
      'prezime': new FormControl(null, Validators.required),
      'telefon': new FormControl(null, Validators.required),
      'drzava': new FormControl(null, Validators.required),
      'grad': new FormControl(null, Validators.required),
      'adresa': new FormControl(null, Validators.required),
      'jmbg': new FormControl(null, Validators.required),
      'pozicija': new FormControl(null, Validators.required),
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
        this.administrator = profil;
        this.azurirajForm.get('ime')?.setValue(profil.ime);
        this.azurirajForm.get('prezime')?.setValue(profil.prezime);
        this.azurirajForm.get('telefon')?.setValue(profil.telefon);
        this.azurirajForm.get('drzava')?.setValue(profil.drzava);
        this.azurirajForm.get('grad')?.setValue(profil.grad);
        this.azurirajForm.get('adresa')?.setValue(profil.adresa);
        this.azurirajForm.get('jmbg')?.setValue(profil.jmbg);
        this.azurirajForm.get('sifra')?.setValue(profil.sifra);
        this.azurirajForm.get('pozicija')?.setValue(profil.pozicija);
      }
      })
    }
  }

  AzurirajAdmina(){
    this.administrator.ime = this.azurirajForm.get('ime')?.value;
    this.administrator.prezime = this.azurirajForm.get('prezime')?.value;
    this.administrator.telefon = this.azurirajForm.get('telefon')?.value;
    this.administrator.drzava = this.azurirajForm.get('drzava')?.value;
    this.administrator.grad = this.azurirajForm.get('grad')?.value;
    this.administrator.adresa = this.azurirajForm.get('adresa')?.value;
    this.administrator.jmbg = this.azurirajForm.get('jmbg')?.value;
    this.administrator.pozicija = this.azurirajForm.get('pozicija')?.value;
    this.administrator.sifra = this.azurirajForm.get('sifra')?.value;

    this.administratorService.AzurirajAdministratora(this.administrator.email, this.administrator, this.token)
    .subscribe({
      next:(azurirani)=>{
        console.log(azurirani);
      }
    })
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
