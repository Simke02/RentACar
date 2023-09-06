import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-kviz',
  templateUrl: './kviz.component.html',
  styleUrls: ['./kviz.component.css']
})
export class KvizComponent implements OnChanges {

  @Input() kojiKviz: number = 0;
  @Output() rezultatEvent = new EventEmitter<number>();
  korisnikForm: FormGroup;
  obicnaForm: FormGroup;
  rezultat: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    this.kojiKviz = changes['kojiKviz'].currentValue;
  }

  constructor(){
    this.korisnikForm = new FormGroup({
      'prvoK': new FormControl(null, Validators.required),
      'drugoK': new FormControl(null, Validators.required),
      'treceK': new FormControl(null, Validators.required)
    }),
    this.obicnaForm = new FormGroup({
      'prvo': new FormControl(null, Validators.required),
      'drugo': new FormControl(null, Validators.required),
      'trece': new FormControl(null, Validators.required)
    })
  }

  obicnaF(){
    if(2018 === this.obicnaForm.get('prvo')?.value) 
      this.rezultat++;
    if(50 === this.obicnaForm.get('drugo')?.value)
      this.rezultat++;
    if(3 === this.obicnaForm.get('trece')?.value)
      this.rezultat++;
    this.rezultatEvent.emit(this.rezultat);
  }

  korisnikF(){
    if(60 === this.korisnikForm.get('prvoK')?.value)
      this.rezultat++;
    if(1 === this.korisnikForm.get('drugoK')?.value)
      this.rezultat++;
    this.rezultat++;
    this.rezultatEvent.emit(this.rezultat);
  }
}
