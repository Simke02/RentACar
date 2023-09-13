import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdministratorD } from '../models/administrator.model';
import { RezervacijaService } from '../services/rezervacija.service';
import { AdministratorService } from '../services/administrator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dodaj-admina',
  templateUrl: './dodaj-admina.component.html',
  styleUrls: ['./dodaj-admina.component.css']
})
export class DodajAdminaComponent implements OnInit {
  dodajAdminaForm: FormGroup;
  administrator: AdministratorD = {
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
  }
  drzave: string[] = [];
  prikazSifre: string = "password";

  constructor(private rezervacijaService: RezervacijaService,
              private administratorService: AdministratorService,
              private router: Router){
    this.dodajAdminaForm = new FormGroup({
      'ime': new FormControl(null, Validators.required),
      'prezime': new FormControl(null, Validators.required),
      'telefon': new FormControl(null, Validators.required),
      'drzava': new FormControl(null, Validators.required),
      'grad': new FormControl(null, Validators.required),
      'adresa': new FormControl(null, Validators.required),
      'jmbg': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'sifra': new FormControl(null, Validators.required),
      'pozicija': new FormControl(null, Validators.required)
    })
  }

  ngOnInit() {
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

  DodajAdministratora(){
    this.administrator.ime = this.dodajAdminaForm.get('ime')?.value;
    this.administrator.prezime = this.dodajAdminaForm.get('prezime')?.value;
    this.administrator.email = this.dodajAdminaForm.get('email')?.value;
    this.administrator.telefon = this.dodajAdminaForm.get('telefon')?.value;
    this.administrator.drzava = this.dodajAdminaForm.get('drzava')?.value;
    this.administrator.grad = this.dodajAdminaForm.get('grad')?.value;
    this.administrator.adresa = this.dodajAdminaForm.get('adresa')?.value;
    this.administrator.sifra = this.dodajAdminaForm.get('sifra')?.value;
    this.administrator.jmbg = this.dodajAdminaForm.get('jmbg')?.value;
    this.administrator.pozicija = this.dodajAdminaForm.get('pozicija')?.value;

    const token : any = localStorage.getItem('token');

    this.administratorService.DodajAdministratora(token, this.administrator)
    .subscribe({
      next:(admin)=>{
        console.log(admin);
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
