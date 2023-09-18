import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  kojiKviz: number = 0;
  svakaCast: boolean = false;
  rezultat: number = 0;
  constructor() {}

  ngOnInit() {
    
  }

  pokreniKviz(){
    if(localStorage.getItem('token') === null)
      this.kojiKviz = 1;
    else
      this.kojiKviz = 2;
  }

  proveriRez(rez: number){
    this.svakaCast = true;
    this.rezultat = rez;
    this.kojiKviz = 0;
  }
}
