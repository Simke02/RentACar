import { Component, OnInit } from '@angular/core';
import { Automobil } from '../models/automobili.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AutomobiliService } from '../services/automobili.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RezervacijaService } from '../services/rezervacija.service';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-azuriraj-auto',
  templateUrl: './azuriraj-auto.component.html',
  styleUrls: ['./azuriraj-auto.component.css']
})
export class AzurirajAutoComponent implements OnInit {

  azurirajForm: FormGroup;
  automobil: Automobil = {
    id: 0,
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
    lokacija: "",
  }
  token: any;
  lokacije: string[] = [];
  tipoviAuto: string[] = [];

  constructor(private automobiliService: AutomobiliService,
              private route: ActivatedRoute,
              private homeService: HomeService,
              private router: Router) {
    this.azurirajForm = new FormGroup({
      'marka': new FormControl(null, Validators.required),
      'model': new FormControl(null, Validators.required),
      'broj_sedista': new FormControl(null, Validators.required),
      'snaga_motora': new FormControl(null, Validators.required),
      'gorivo': new FormControl(null, Validators.required),
      'klima': new FormControl(null, Validators.required),
      'registracija': new FormControl(null, Validators.required),
      'tip': new FormControl(null, Validators.required),
      'transmisija': new FormControl(null, Validators.required),
      'godiste': new FormControl(null, Validators.required),
      'dodatno_osiguranje': new FormControl(null, Validators.required),
      'cena': new FormControl(null, Validators.required),
      'slika': new FormControl(null, Validators.required),
      'lokacija': new FormControl(null, Validators.required),
    })
    this.token = localStorage.getItem('token');

    this.homeService.ProcitajLokacije("../")
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

    this.homeService.ProcitajTipove("../")
    .subscribe({
      next: (tipovi) => {
        for (const tip of tipovi.split(/[\r\n]+/)){
          this.tipoviAuto.push(tip);
        }
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.automobiliService.VratiAutomobil(this.token, id)
    .subscribe({
      next: (automobil)=>{
        this.automobil = automobil;

        this.azurirajForm.get('marka')?.setValue(this.automobil.marka);
        this.azurirajForm.get('model')?.setValue(this.automobil.model);
        this.azurirajForm.get('broj_sedista')?.setValue(this.automobil.broj_sedista);
        this.azurirajForm.get('snaga_motora')?.setValue(this.automobil.snaga_motora);
        this.azurirajForm.get('gorivo')?.setValue(this.automobil.gorivo);
        this.azurirajForm.get('klima')?.setValue(this.automobil.klima);
        this.azurirajForm.get('registracija')?.setValue(this.automobil.registracija);
        this.azurirajForm.get('tip')?.setValue(this.automobil.tip);
        this.azurirajForm.get('transmisija')?.setValue(this.automobil.transmisija);
        this.azurirajForm.get('godiste')?.setValue(this.automobil.godiste);
        this.azurirajForm.get('dodatno_osiguranje')?.setValue(this.automobil.dodatno_osiguranje);
        this.azurirajForm.get('cena')?.setValue(this.automobil.cena);
        this.azurirajForm.get('slika')?.setValue(this.automobil.slika);
        this.azurirajForm.get('lokacija')?.setValue(this.automobil.lokacija);
      }
    })
  }

  AzurirajAuto(){
    this.automobil.marka = this.azurirajForm.get('marka')?.value;
    this.automobil.model = this.azurirajForm.get('model')?.value;
    this.automobil.broj_sedista = this.azurirajForm.get('broj_sedista')?.value;
    this.automobil.snaga_motora = this.azurirajForm.get('snaga_motora')?.value;
    this.automobil.gorivo = this.azurirajForm.get('gorivo')?.value;
    this.automobil.klima = this.azurirajForm.get('klima')?.value;
    this.automobil.registracija = this.azurirajForm.get('registracija')?.value;
    this.automobil.tip = this.azurirajForm.get('tip')?.value;
    this.automobil.transmisija = this.azurirajForm.get('transmisija')?.value;
    this.automobil.godiste = this.azurirajForm.get('godiste')?.value;
    this.automobil.dodatno_osiguranje = this.azurirajForm.get('dodatno_osiguranje')?.value;
    this.automobil.cena = this.azurirajForm.get('cena')?.value;
    this.automobil.slika = this.azurirajForm.get('slika')?.value;
    this.automobil.lokacija = this.azurirajForm.get('lokacija')?.value;

    this.automobiliService.AzurirajAutomobil(this.token, this.automobil)
    .subscribe({
      next:(azurirani)=>{
        console.log(azurirani);
      }
    })
  }

  odustani(){
    this.router.navigate(['../svi-automobili']);
  }
}
