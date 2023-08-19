import { Component } from '@angular/core';
import { Automobil } from '../models/automobili.model';
import { AutomobiliService } from '../services/automobili.service';

@Component({
  selector: 'app-automobili',
  templateUrl: './automobili.component.html',
  styleUrls: ['./automobili.component.css']
})
export class AutomobiliComponent {
  automobili: Automobil[] = [];

  constructor(private automobiliService: AutomobiliService) {}

  ngOnInit(){
    this.automobiliService.VratiSveAutomobili()
    .subscribe({
      next: (automobili) => {
        this.automobili = automobili;
        console.log(this.automobili);
      },
      error: (response) =>{
        console.log(response);
      }
    })
  }
}
