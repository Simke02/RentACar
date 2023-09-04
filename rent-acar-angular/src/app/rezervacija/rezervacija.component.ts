import { Component, OnInit } from '@angular/core';
import { RezervisiService } from '../services/rezervisi.service';
import { Automobil } from '../models/automobili.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RezervacijaService } from '../services/rezervacija.service';
import { KorisnikD } from '../models/korisnik.model';
import { KorisnikService } from '../services/korisnik.service';
import { RezervacijaD } from '../models/rezervacija.model';
import { catchError, of } from 'rxjs';
import { KalendarService } from '../services/kalendar.service';
import { Kalendar, KalendarD } from '../models/kalendar.model';
import { DanD } from '../models/dan.model';
import { DanService } from '../services/dan.service';

@Component({
  selector: 'app-rezervacija',
  templateUrl: './rezervacija.component.html',
  styleUrls: ['./rezervacija.component.css']
})
export class RezervacijaComponent implements OnInit {
  rezervacijaForm: FormGroup;
  auto: Automobil = {
    id: 0,
    marka: "",
    model: "",
    broj_sedista: "",
    snaga_motora: "",
    gorivo: "",
    klima: true,
    registracija: "",
    tip: "",
    transmisija: "",
    godiste: "",
    dodatno_osiguranje: 0,
    cena: 0,
    slika: "",
    lokacija: ""
  }
  korisnik: KorisnikD = {
    email: "",
    sifra: "",
    ime: "",
    prezime: "",
    jmbg: "",
    drzava: "",
    grad: "",
    adresa: "",
    telefon: "",
    broj_pasosa: "",
    broj_vozacke: ""
  }
  rezervacija: RezervacijaD = {
    ukupna_cena: 0,
    vreme_izdavanja: new Date(),
    vreme_vracanja: new Date(),
    dodatno_osiguranje: false,
    korisnik: {
      id: 0,
      email: "",
      sifra: "",
      ime: "",
      prezime: "",
      jmbg: "",
      drzava: "",
      grad: "",
      adresa: "",
      telefon: "",
      broj_pasosa: "",
      broj_vozacke: ""
    },
    automobil: {
      id: 0,
      marka: "",
      model: "",
      broj_sedista: "",
      snaga_motora: "",
      gorivo: "",
      klima: true,
      registracija: "",
      tip: "",
      transmisija: "",
      godiste: "",
      dodatno_osiguranje: 0,
      cena: 0,
      slika: "",
      lokacija: ""
    }
  }
  drzave: string[] = [];
  ukupna_cena: number = 0;
  vreme_izdavanja: Date = new Date();
  vreme_vracanja: Date = new Date();
  dodatno_osiguranje: boolean = false;
  broj_dana: number = 0;


  constructor(private rezervisiService: RezervisiService,
              private rezervacijaService: RezervacijaService,
              private korisnikService: KorisnikService,
              private kalendarService: KalendarService,
              private danService: DanService) {
    this.rezervacijaForm = new FormGroup({
      'ime': new FormControl(null, Validators.required),
      'prezime': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'telefon': new FormControl(null, Validators.required),
      'drzava': new FormControl(null, Validators.required),
      'grad': new FormControl(null, Validators.required),
      'adresa': new FormControl(null, Validators.required),
      'broj_vozacke': new FormControl(null, Validators.required),
      'jmbg': new FormControl(null),
      'broj_pasosa': new FormControl(null)
    });
  }

  ngOnInit(){
    this.auto = this.rezervisiService.vratiAuto();
    this.rezervacijaService.ProcitajDrzave()
    .subscribe({
      next: (drzave) => {
        for (const drzava of drzave.split(/[\r\n]+/)){
          this.drzave.push(drzava);
        }
      },
      error: (response) => {
        console.log(response);
      }
    })

    //Izracunavanje na koliko je rezervisan auto
    this.vreme_izdavanja = new Date(this.rezervisiService.vratiVremeIzdavanja());
    this.vreme_vracanja = new Date(this.rezervisiService.vratiVremeVracanja());
    const razlika = this.vreme_vracanja.getTime() - this.vreme_izdavanja.getTime();
    this.broj_dana = Math.floor(razlika / (1000 * 3600 * 24));
    console.log("Broj dana: " + this.broj_dana);
    
    //Popunjavanje objekta rezervacija
    this.ukupna_cena = this.auto.cena*this.broj_dana;
    this.dodatno_osiguranje = this.rezervisiService.vratiBoolOsiguranje();
    if(this.dodatno_osiguranje)
      this.ukupna_cena += this.auto.dodatno_osiguranje*this.broj_dana;
  }

  zavrsiRezervaciju(){
    //Namesti i kada ima korisnika
    this.korisnik.ime = this.rezervacijaForm.get('ime')?.value;
    this.korisnik.prezime = this.rezervacijaForm.get('prezime')?.value;
    this.korisnik.email = this.rezervacijaForm.get('email')?.value;
    this.korisnik.telefon = this.rezervacijaForm.get('telefon')?.value;
    this.korisnik.drzava = this.rezervacijaForm.get('drzava')?.value;
    this.korisnik.grad = this.rezervacijaForm.get('grad')?.value;
    this.korisnik.adresa = this.rezervacijaForm.get('adresa')?.value;
    this.korisnik.broj_vozacke = this.rezervacijaForm.get('broj_vozacke')?.value;

    if(this.rezervacijaForm.get('drzava')?.value == 'Srbija')
      this.korisnik.jmbg = this.rezervacijaForm.get('jmbg')?.value;
    else
      this.korisnik.broj_pasosa = this.rezervacijaForm.get('broj_pasosa')?.value;

    this.rezervacija.vreme_izdavanja = this.vreme_izdavanja;
    this.rezervacija.vreme_vracanja = this.vreme_vracanja;
    this.rezervacija.dodatno_osiguranje = this.dodatno_osiguranje;
    this.rezervacija.ukupna_cena = this.ukupna_cena;
    this.rezervacija.automobil = this.auto;

    this.korisnikService.DodajKorisnika(this.korisnik).pipe(
      catchError(() => {
        console.error("Korisnik je vec upisan");
        return of(null);
      })
    )
    .subscribe({
      next: (korisnik)=>{
        console.log(korisnik);
        this.korisnikService.VratiKorisnika(this.korisnik.email)
        .subscribe({
          next: (korisnik) => {
            this.rezervacija.korisnik = korisnik;
            this.rezervacijaService.DodajRezervacija(this.rezervacija)
            .subscribe({
              next: (rezervacija)=>{
                console.log(rezervacija);
                this.rezervisiService.obrisiAuto();
                this.rezervisiService.obrisiBoolOsiguranje();
                this.rezervisiService.obrisiVremeIzdavanja();
                this.rezervisiService.obrisiVremeVracanja();
                this.rezervisiService.obrisiNoviZahtev();
              }
            })
          }
        })
      }
    })

    //Dodavanje u kalendar rezervisanih
    for(let i =0; i<this.broj_dana+1;i++){//ovde treba tacni izracunat broj dana
      //Kalendar koji proveravamo da li postoji
      let datum;
      if(i==0)
        datum = new Date(this.vreme_izdavanja);
      else if(i==this.broj_dana)//onda je ovde -1
        datum = new Date(this.vreme_vracanja);
      else{
        datum = new Date(this.vreme_izdavanja);
        datum.setDate(this.vreme_izdavanja.getDate() + i);
      } 
      datum.setHours(0,0,0,0);
      const godina = datum.getFullYear();
      const mesec = (datum.getMonth() + 1).toString().padStart(2, '0');
      const dani = datum.getDate().toString().padStart(2, '0');
      const sati = datum.getHours().toString().padStart(2, '0');
      const minuti = datum.getMinutes().toString().padStart(2, '0');
      let kalendarUpis: KalendarD = {
        datum: `${godina}-${mesec}-${dani}T${sati}:${minuti}`
      }

      //dan koji upisujemo
      let vreme;
      let izd = false;
      if(i==0){
        vreme = new Date(this.vreme_izdavanja);
        izd = true;
      }
      else if(i==this.broj_dana)//onda je ovde -1
        vreme = new Date(this.vreme_vracanja);
      else{
        vreme = new Date(this.vreme_izdavanja);
        vreme.setDate(this.vreme_izdavanja.getDate() + i);
        vreme.setHours(0,0,0,0);
      } 
      const godinaV = vreme.getFullYear();
      const mesecV = (vreme.getMonth() + 1).toString().padStart(2, '0');
      const daniV = vreme.getDate().toString().padStart(2, '0');
      const satiV = vreme.getHours().toString().padStart(2, '0');
      const minutiV = vreme.getMinutes().toString().padStart(2, '0');
      let dan: DanD = {
        vreme: `${godinaV}-${mesecV}-${daniV}T${satiV}:${minutiV}`,
        izdavanje: izd,
        automobil: this.auto,
        kalendar: {
          id: 0,
          datum: ""
        }
      }


      this.kalendarService.DodajKalendar(kalendarUpis).pipe(
        catchError(() => {
          console.error("Kalendar je vec upisan");
          return of(null);
        })
      )
      .subscribe({
        next: (kalendar)=>{
          console.log(kalendar);
          this.kalendarService.VratiOdgovarajuciKalendar(kalendarUpis.datum)
          .subscribe({
            next: (kalendarV)=>{
              console.log(kalendarV);
              dan.kalendar = kalendarV;
              this.danService.DodajDan(dan)
              .subscribe({
                next: (danV)=>{
                  console.log(danV);
                },
              })
            },
          })
        }
      })
    }
  }

  odustani(){

  }

  priSelekciji(){
    if(this.rezervacijaForm.get('drzava')?.value == 'Srbija'){
      this.rezervacijaForm.get('jmbg')?.addValidators(Validators.required);
      this.rezervacijaForm.get('jmbg')?.updateValueAndValidity();
      this.rezervacijaForm.get('broj_pasosa')?.clearValidators();
      this.rezervacijaForm.get('broj_pasosa')?.updateValueAndValidity();
    }
    else{
      this.rezervacijaForm.get('broj_pasosa')?.addValidators(Validators.required);
      this.rezervacijaForm.get('broj_pasosa')?.updateValueAndValidity();
      this.rezervacijaForm.get('jmbg')?.clearValidators();
      this.rezervacijaForm.get('jmbg')?.updateValueAndValidity()
    }
  }
}
