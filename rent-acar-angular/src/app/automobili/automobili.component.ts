import { Component, OnDestroy, OnInit } from '@angular/core';
import { Automobil } from '../models/automobili.model';
import { Store } from '@ngrx/store';
import { Stanje } from './store/automobil.reducer';
import { selectAutomobil } from './store/automobil.selector';
import { Observable, Subscription, map, toArray } from 'rxjs';
import { RezervisiService } from '../services/rezervisi.service';
import { ActivatedRoute } from '@angular/router';
import { inicijalizacija, ocisti } from './store/automobil.action';

@Component({
  selector: 'app-automobili',
  templateUrl: './automobili.component.html',
  styleUrls: ['./automobili.component.css']
})
export class AutomobiliComponent implements OnInit {
  automobili$ = this.store.select(selectAutomobil);
  automobili: Automobil[] = [];
  //Sortiranje
  imeAtributa: string = "cena";
  redosled: string = "asc";

  constructor(private store: Store<Stanje>, private route: ActivatedRoute,
              private rezervisiService: RezervisiService) {}

  ngOnInit() {
    const noviZahtev: boolean = this.rezervisiService.vratiNoviZahtev();

    if(noviZahtev){
      this.store.dispatch(ocisti());

      const tip = this.route.snapshot.params['tip'];
      const lokacija = this.route.snapshot.params['lokacija'];
      const vreme_i = this.rezervisiService.vratiVremeIzdavanja();
      const vreme_v = this.rezervisiService.vratiVremeVracanja();

      this.store.dispatch(inicijalizacija({tip, lokacija, vreme_i, vreme_v}));
      this.rezervisiService.izmeniNoviZahtev();
    }
    this.automobili$.subscribe({
      next: (automobili: Automobil[]) => {
        this.automobili = automobili;
        console.log(this.automobili);
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  rezervisi(i: number){
    this.rezervisiService.sacuvajAuto(this.automobili[i]);
  }

  priSelekciji(vrednost: string | null){
    //if(vrednost!=null){
    switch (vrednost) {
      case '0':{
        this.imeAtributa='cena'
        this.redosled='desc'
        break;
      }
      case '1':{
        this.imeAtributa='cena'
        this.redosled='asc'
        break;
      }
      case '2':{
        this.imeAtributa='marka'
        this.redosled='asc'
        break;
      }
      case '3':{
        this.imeAtributa='marka'
        this.redosled='desc'
        break;
      }
      default:{
        break;
      }
    }
  //}
  }
}
