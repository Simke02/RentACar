import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HomeService } from '../services/home.service';
import { Router } from '@angular/router';
import { Stanje } from '../automobili/store/automobil.reducer';
import { Store } from '@ngrx/store';
import { inicijalizacija } from '../automobili/store/automobil.action';
import { RezervisiService } from '../services/rezervisi.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private homeService: HomeService,
              private router: Router,
              private store: Store<Stanje>,
              private rezervisiService: RezervisiService,
              private datePipe: DatePipe) {}

  pronadjiAutoForm: FormGroup = new FormGroup({});
  tipoviAuto: string[] = [];
  lokacije: string[] = [];
  trenutniDatum: string|null = "";
  sledeciDatum: string|null = "";

  ngOnInit(): void {
    this.trenutniDatum = new Date().toISOString().slice(0, 16);
    const danas = new Date();
    const sutra = new Date(danas);
    sutra.setDate(danas.getDate() + 1);
    this.sledeciDatum = sutra.toISOString().slice(0, 16);

    this.pronadjiAutoForm = new FormGroup({
      'tip': new FormControl(null, Validators.required),
      'lokacija': new FormControl(null, Validators.required),
      'vreme_i': new FormControl(this.trenutniDatum, Validators.required),
      'vreme_v': new FormControl(this.sledeciDatum, Validators.required)
    });

    this.homeService.ProcitajTipove()
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

    this.homeService.ProcitajLokacije()
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

  pronadjiAuto(){
    const tip = this.pronadjiAutoForm.get('tip')?.value;
    const lokacija = this.pronadjiAutoForm.get('lokacija')?.value;
    const vreme_i = this.pronadjiAutoForm.get('vreme_i')?.value;
    const vreme_v = this.pronadjiAutoForm.get('vreme_v')?.value;

    this.rezervisiService.sacuvajVremeIzdavanja(vreme_i);
    this.rezervisiService.sacuvajVremeVracanja(vreme_v)

    //this.store.dispatch(inicijalizacija({tip, lokacija, vreme_i, vreme_v}));
    this.rezervisiService.sacuvajNoviZahtev();
    this.router.navigate(['/automobili', tip, lokacija]);
  }
}
