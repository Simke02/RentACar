import { Component, OnInit } from '@angular/core';
import { RezervisiService } from '../services/rezervisi.service';

@Component({
  selector: 'app-osiguranje',
  templateUrl: './osiguranje.component.html',
  styleUrls: ['./osiguranje.component.css']
})
export class OsiguranjeComponent implements OnInit {
  osiguranje: number = 0;

  constructor(private rezervisiService: RezervisiService) {}

  ngOnInit() {
    this.osiguranje = this.rezervisiService.vratiOsiguranje();
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
