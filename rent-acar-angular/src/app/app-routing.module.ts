import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AutomobiliComponent } from './automobili/automobili.component';
import { OsiguranjeComponent } from './osiguranje/osiguranje.component';
import { RezervacijaComponent } from './rezervacija/rezervacija.component';
import { AboutComponent } from './about/about.component';
import { DodajAutoComponent } from './dodaj-auto/dodaj-auto.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DodajAdminaComponent } from './dodaj-admina/dodaj-admina.component';
import { AzurirajKorisnikaComponent } from './azuriraj-korisnika/azuriraj-korisnika.component';
import { LoginGuard } from './guards/login.guard';
import { AzurirajAdminaComponent } from './azuriraj-admina/azuriraj-admina.component';
import { AdminGuard } from './guards/admin.guard';
import { SveRezervacijeComponent } from './sve-rezervacije/sve-rezervacije.component';
import { KorisnikoveRezervacijeComponent } from './korisnikove-rezervacije/korisnikove-rezervacije.component';
import { SviAutomobiliComponent } from './svi-automobili/svi-automobili.component';
import { AzurirajAutoComponent } from './azuriraj-auto/azuriraj-auto.component';
import { RezOsigGuard } from './guards/rezOsig.guard';
import { AutoGuard } from './guards/auto.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'automobili', component: AutomobiliComponent, canActivate: [AutoGuard]},
  {path: 'osiguranje', component: OsiguranjeComponent, canActivate: [RezOsigGuard]},
  {path: 'rezervacija', component: RezervacijaComponent, canActivate: [RezOsigGuard]},
  {path: 'onama', component: AboutComponent},
  {path: 'dodaj-auto', component: DodajAutoComponent, canActivate: [AdminGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'dodaj-admina', component: DodajAdminaComponent, canActivate: [AdminGuard]},
  {path: 'azuriraj-korisnika', component: AzurirajKorisnikaComponent, canActivate:[LoginGuard]},
  {path: 'azuriraj-admina', component: AzurirajAdminaComponent, canActivate: [AdminGuard]},
  {path: 'sve-rezervacije', component: SveRezervacijeComponent, canActivate: [AdminGuard]},
  {path: 'korisnikove-rezervacije', component: KorisnikoveRezervacijeComponent, canActivate: [LoginGuard]},
  {path: 'svi-automobili', component: SviAutomobiliComponent, canActivate: [AdminGuard]},
  {path: 'azuriraj-auto/:id', component: AzurirajAutoComponent, canActivate: [AdminGuard]},
  {path: '**', redirectTo: 'not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
