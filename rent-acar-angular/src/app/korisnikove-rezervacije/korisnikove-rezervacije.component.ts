import { Component, OnInit } from '@angular/core';
import { Rezervacija } from '../models/rezervacija.model';
import { RezervacijaService } from '../services/rezervacija.service';

@Component({
  selector: 'app-korisnikove-rezervacije',
  templateUrl: './korisnikove-rezervacije.component.html',
  styleUrls: ['./korisnikove-rezervacije.component.css']
})
export class KorisnikoveRezervacijeComponent implements OnInit {
  rezervacije: Rezervacija[] = [];
  vremena_i: string[] = [];
  vremena_v: string[] = [];

  constructor(private rezervacijaService: RezervacijaService) {}

  ngOnInit() {
    const token: any = localStorage.getItem('token');
    this.rezervacijaService.VratiKorisnikoveRezervacije(token)
    .subscribe({
      next: (rezervacije)=>{
        this.rezervacije = rezervacije;
        for(let rez of this.rezervacije){
          let str = rez.vreme_izdavanja.toString();
          let splitted1 = str.split("-", 3);
          let splitted2 = splitted1[2].split("T", 2);
          let splitted3 = splitted2[1].split(":", 3); 
          this.vremena_i.push(splitted3[0]+":"+splitted3[1]+" "+splitted2[0]+"."+splitted1[1]+"."+
              splitted1[0]+".");

          str = rez.vreme_vracanja.toString();
          splitted1 = str.split("-", 3);
          splitted2 = splitted1[2].split("T", 2);
          splitted3 = splitted2[1].split(":", 3);
          this.vremena_v.push(splitted3[0]+":"+splitted3[1]+" "+splitted2[0]+"."+splitted1[1]+"."+
              splitted1[0]+".");
        }
      }
    })
  }
}
