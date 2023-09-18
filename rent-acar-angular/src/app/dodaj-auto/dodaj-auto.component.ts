import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AutomobilD } from '../models/automobili.model';
import { HomeService } from '../services/home.service';
import { AutomobiliService } from '../services/automobili.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dodaj-auto',
  templateUrl: './dodaj-auto.component.html',
  styleUrls: ['./dodaj-auto.component.css']
})
export class DodajAutoComponent implements OnInit {
  dodajAuto: FormGroup;
  auto: AutomobilD = {
    marka: "",
    model: "",
    broj_sedista: "",
    snaga_motora: "",
    gorivo: "",
    klima: false,
    registracija: "",
    tip: "",
    transmisija: "",
    godiste: "",
    dodatno_osiguranje: 0,
    cena: 0,
    slika: "",
    lokacija: ""
  }
  tipovi: string[] = [];
  lokacije: string[] = [];

  constructor(private homeService: HomeService,
              private automobiliService: AutomobiliService,
              private router: Router){
    this.dodajAuto = new FormGroup({
      'marka': new FormControl(null, Validators.required),
      'model': new FormControl(null, Validators.required),
      'broj_sedista': new FormControl(null, Validators.required),
      'snaga_motora': new FormControl(null, Validators.required),
      'gorivo': new FormControl(null, Validators.required),
      'klima': new FormControl(false, Validators.required),
      'registracija': new FormControl(null, Validators.required),
      'tip': new FormControl(null, [Validators.required, this.ZabranjenaVrednost.bind(this)]),
      'transmisija': new FormControl(null, Validators.required),
      'godiste': new FormControl(null, Validators.required),
      'dodatno_osiguranje': new FormControl(null, Validators.required),
      'cena': new FormControl(null, Validators.required),
      'slika': new FormControl(null, Validators.required),
      'lokacija': new FormControl(null, [Validators.required, this.ZabranjenaVrednost.bind(this)]),
    });
  }

  ngOnInit() {
    this.homeService.ProcitajTipove("")
    .subscribe({
      next: (tipovi) => {
        for (const tip of tipovi.split(/[\r\n]+/)){
          this.tipovi.push(tip);
        }
      },
      error: (response) => {
        console.log(response);
      }
    })

    this.homeService.ProcitajLokacije("")
    .subscribe({
      next: (lokacije) => {
        for (const lokacija of lokacije.split(/[\r\n]+/)){
          this.lokacije.push(lokacija);
        }
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  dodajAutomobil(){
    this.auto.marka = this.dodajAuto.get('marka')?.value;
    this.auto.model = this.dodajAuto.get('model')?.value;
    this.auto.broj_sedista = this.dodajAuto.get('broj_sedista')?.value;
    this.auto.snaga_motora = this.dodajAuto.get('snaga_motora')?.value;
    this.auto.gorivo = this.dodajAuto.get('gorivo')?.value;
    this.auto.klima = this.dodajAuto.get('klima')?.value;
    this.auto.registracija = this.dodajAuto.get('registracija')?.value;
    this.auto.tip = this.dodajAuto.get('tip')?.value;
    this.auto.transmisija = this.dodajAuto.get('transmisija')?.value;
    this.auto.godiste = this.dodajAuto.get('godiste')?.value;
    this.auto.dodatno_osiguranje = this.dodajAuto.get('dodatno_osiguranje')?.value;
    this.auto.cena = this.dodajAuto.get('cena')?.value;
    this.auto.slika = this.dodajAuto.get('slika')?.value;
    this.auto.lokacija = this.dodajAuto.get('lokacija')?.value;

    const token : any = localStorage.getItem('token');

    this.automobiliService.DodajAutomobil(token, this.auto)
    .subscribe({
      next: (auto)=>{
        console.log(auto);
      }
    })
  }

  odustani(){
    this.router.navigate(['']);
  }

  ZabranjenaVrednost(control: FormControl): {[s: string]: boolean} | null{
    if('-1' === control.value){
      return {'imeZabranjeno': true}
    }
    return null;
  }
}