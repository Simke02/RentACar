import { Component, OnInit } from '@angular/core';
import { Automobil } from '../models/automobili.model';
import { Store } from '@ngrx/store';
import { Stanje } from './store/automobil.reducer';
import { selectAutomobil } from './store/automobil.selector';
import { Observable, Subscription, map, toArray } from 'rxjs';
import { RezervisiService } from '../services/rezervisi.service';

@Component({
  selector: 'app-automobili',
  templateUrl: './automobili.component.html',
  styleUrls: ['./automobili.component.css']
})
export class AutomobiliComponent implements OnInit {
  automobili$ = this.store.select(selectAutomobil);
  automobili: Automobil[] = [];

  constructor(private store: Store<Stanje>,
              private rezervisiService: RezervisiService) {}

  ngOnInit() {
    this.automobili$.subscribe({
      next: (automobili: Automobil[]) => {
        this.automobili = automobili;
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  rezervisi(i: number){
    this.rezervisiService.sacuvajAuto(this.automobili[i]);
  }
}
