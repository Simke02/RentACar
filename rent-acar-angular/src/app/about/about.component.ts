import { Component, OnInit } from '@angular/core';
import { DanService } from '../services/dan.service';
import { KalendarService } from '../services/kalendar.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  
  constructor(private kalendarService: KalendarService) {}

  ngOnInit() {
    const brojevi: string[] = ["2023-09-03T00:00","2023-09-04T00:00"];
    this.kalendarService.VratiIdOdgovarajucihKalendara(brojevi)
    .subscribe({
      next: (e)=>{
        console.log(e);
      }
    }
    )
  }
}
