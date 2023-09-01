import { Component, OnInit } from '@angular/core';
import { RezervisiService } from '../services/rezervisi.service';

@Component({
  selector: 'app-osiguranje',
  templateUrl: './osiguranje.component.html',
  styleUrls: ['./osiguranje.component.css']
})
export class OsiguranjeComponent implements OnInit {
  osiguranje: number = 0;
  ukupna_cena: number = 0;
  vreme_izdavanja: Date = new Date();
  vreme_vracanja: Date = new Date();

  constructor(private rezervisiService: RezervisiService) {}

  ngOnInit() {
    this.osiguranje = this.rezervisiService.vratiOsiguranje();

    this.vreme_izdavanja = new Date(this.rezervisiService.vratiVremeIzdavanja());
    this.vreme_vracanja = new Date(this.rezervisiService.vratiVremeVracanja());
    const razlika = this.vreme_vracanja.getTime() - this.vreme_izdavanja.getTime();
    const broj_dana = Math.floor(razlika / (1000 * 3600 * 24));
    this.ukupna_cena = broj_dana * this.osiguranje;
  }

  izaberi(id: string){
    switch (id) {
      case '1':
        this.rezervisiService.sacuvajBoolOsiguranje(false);
        break;
      case '2':
        this.rezervisiService.sacuvajBoolOsiguranje(true);
        break;
      default:
        break;
    }
  }
}
