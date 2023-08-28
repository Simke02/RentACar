import { Component, OnInit } from '@angular/core';
import { RezervisiService } from '../services/rezervisi.service';
import { Automobil } from '../models/automobili.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-rezervacija',
  templateUrl: './rezervacija.component.html',
  styleUrls: ['./rezervacija.component.css']
})
export class RezervacijaComponent implements OnInit {
  rezervacijaForm: FormGroup;
  auto: Automobil = {
    id: 0,
    marka: "",
    model: "",
    broj_sedista: "",
    snaga_motora: "",
    gorivo: "",
    klima: true,
    registracija: "",
    tip: "",
    transmisija: "",
    godiste: "",
    dodatno_osiguranje: 0,
    cena: 0,
    slika: "",
    lokacija: ""
  }

  constructor(private rezervisiService: RezervisiService) {
    this.rezervacijaForm = new FormGroup({
      'ime': new FormControl(null, Validators.required),
      'prezime': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'telefon': new FormControl(null, Validators.required),
      'drzava': new FormControl(null, Validators.required),
      'grad': new FormControl(null, Validators.required),
      'adresa': new FormControl(null, Validators.required),
      'broj_vozacke': new FormControl(null, Validators.required),
      'jmbg': new FormControl(null),
      'broj_pasosa': new FormControl(null)
    });
  }

  ngOnInit(){
    this.auto = this.rezervisiService.vratiAuto();
  }

  zavrsiRezervaciju(){

  }

  odustani(){

  }
}
