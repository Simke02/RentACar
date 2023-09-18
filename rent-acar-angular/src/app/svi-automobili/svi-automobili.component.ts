import { Component, OnInit } from '@angular/core';
import { Automobil } from '../models/automobili.model';
import { AutomobiliService } from '../services/automobili.service';

@Component({
  selector: 'app-svi-automobili',
  templateUrl: './svi-automobili.component.html',
  styleUrls: ['./svi-automobili.component.css']
})
export class SviAutomobiliComponent implements OnInit {
  automobili: Automobil[] = [];

  constructor(private automobiliService: AutomobiliService) {}

  ngOnInit() {
    const token: any = localStorage.getItem('token');
    this.automobiliService.VratiSveAutomobile(token)
    .subscribe({
      next: (automobili)=>{
        this.automobili = automobili;
      }
    })
  }

  obrisi(redniBroj: number){
    const token: any = localStorage.getItem('token');
    this.automobiliService.ObrisiAutomobil(this.automobili[redniBroj].id, token)
    .subscribe({
      next:(povratna)=>{
        console.log(povratna);
      }
    })
  }
}
