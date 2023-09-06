import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule, isNgrxMockEnvironment } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule} from '@ngrx/store-devtools'
import { environment } from 'src/environments/environment';
import { HomeComponent } from './home/home.component';
import { AutomobiliComponent } from './automobili/automobili.component';
import { OsiguranjeComponent } from './osiguranje/osiguranje.component';
import { RezervacijaComponent } from './rezervacija/rezervacija.component';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule} from '@angular/forms'
import { AutomobilEffect } from './automobili/store/automobil.effects';
import { automobilReducer } from './automobili/store/automobil.reducer';
import { SortPipe } from './pipes/sort.pipe';
import { DatePipe } from '@angular/common';
import { DodajAutoComponent } from './dodaj-auto/dodaj-auto.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DodajAdminaComponent } from './dodaj-admina/dodaj-admina.component';
import { KvizComponent } from './kviz/kviz.component';
import { AzurirajKorisnikaComponent } from './azuriraj-korisnika/azuriraj-korisnika.component';
import { AzurirajAdminaComponent } from './azuriraj-admina/azuriraj-admina.component';
import { LoginGuard } from './guards/login.guard';
import { AdminGuard } from './guards/admin.guard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AutomobiliComponent,
    OsiguranjeComponent,
    RezervacijaComponent,
    HeaderComponent,
    AboutComponent,
    SortPipe,
    DodajAutoComponent,
    LoginComponent,
    SignupComponent,
    DodajAdminaComponent,
    KvizComponent,
    AzurirajKorisnikaComponent,
    AzurirajAdminaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({stanje: automobilReducer}),
    EffectsModule.forRoot([AutomobilEffect]),
    StoreDevtoolsModule.instrument({logOnly: environment.production}),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe, LoginGuard, AdminGuard],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
