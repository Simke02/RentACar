import { Component, OnDestroy, OnInit } from '@angular/core';
import { Automobil } from '../models/automobili.model';
import { Store, select } from '@ngrx/store';
import { Stanje } from './store/automobil.reducer';
import { automobiliSelector, selectAutomobil, sortiraniAutomobiliSelector } from './store/automobil.selector';
import { Observable, Subscription, filter, map, toArray } from 'rxjs';
import { RezervisiService } from '../services/rezervisi.service';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { inicijalizacija, sortiranje, ocisti } from './store/automobil.action';

@Component({
  selector: 'app-automobili',
  templateUrl: './automobili.component.html',
  styleUrls: ['./automobili.component.css']
})
export class AutomobiliComponent implements OnInit {
  automobili$ = this.store.pipe(select(automobiliSelector));
  imeAtributa: string = "";
  redosled: string = "";
  broj_dana: number = 0;

  constructor(private store: Store<Stanje>, private route: ActivatedRoute,
              private rezervisiService: RezervisiService,
              private router: Router) {
                this.router.events
                .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
                .subscribe(event => {
                  if (
                    event.id === 1 &&
                    event.url === event.urlAfterRedirects
                  ) {
                    const tip: any = sessionStorage.getItem("tip");
                    const lokacija: any = sessionStorage.getItem("lokacija");
                    const vreme_i = this.rezervisiService.vratiVremeIzdavanja();
                    const vreme_v = this.rezervisiService.vratiVremeVracanja();
              
                    this.store.dispatch(inicijalizacija({tip, lokacija, vreme_i, vreme_v}));
                  }
                })
              }

  ngOnInit() {
    const noviZahtev: boolean = this.rezervisiService.vratiNoviZahtev();

    if(noviZahtev){
      this.store.dispatch(ocisti());

      const tip: any = sessionStorage.getItem("tip");
      const lokacija: any = sessionStorage.getItem("lokacija");
      const vreme_i = this.rezervisiService.vratiVremeIzdavanja();
      const vreme_v = this.rezervisiService.vratiVremeVracanja();

      this.store.dispatch(inicijalizacija({tip, lokacija, vreme_i, vreme_v}));
      this.rezervisiService.izmeniNoviZahtev();
    }

    const vreme_izdavanja = new Date(this.rezervisiService.vratiVremeIzdavanja());
    const vreme_vracanja = new Date(this.rezervisiService.vratiVremeVracanja());
    const razlika = vreme_vracanja.getTime() - vreme_izdavanja.getTime();
    this.broj_dana = Math.ceil(razlika / (1000 * 3600 * 24));
  }

  rezervisi(i: number){
    this.automobili$.subscribe({
      next: (automobili) => {
        this.rezervisiService.sacuvajAuto(automobili[i]);
      }
    })
  }

  priSelekciji(vrednost: string | null){
    switch (vrednost) {
      case '0':{
        this.imeAtributa = "cena"
        this.redosled = "desc"
        break;
      }
      case '1':{
        this.imeAtributa = "cena"
        this.redosled = "asc"
        break;
      }
      case '2':{
        this.imeAtributa = "marka"
        this.redosled = "asc"
        break;
      }
      case '3':{
        this.imeAtributa = "marka"
        this.redosled = "desc"
        break;
      }
      case '4':{
        this.imeAtributa = "godiste"
        this.redosled = "desc"
        break;
      }
      case '5':{
        this.imeAtributa = "godiste"
        this.redosled = "asc"
        break;
      }
      default:{
        break;
      }
    }
    this.store.dispatch(sortiranje({atribut: this.imeAtributa, redosled: this.redosled}));
    this.automobili$ = this.store.pipe(select(sortiraniAutomobiliSelector));
  }
}
