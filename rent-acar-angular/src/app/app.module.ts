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
import { CorsInterceptor } from './services/corsInterceptor';
import { ReactiveFormsModule} from '@angular/forms'
import { AutomobilEffect } from './automobili/store/automobil.effects';
import { automobilReducer } from './automobili/store/automobil.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AutomobiliComponent,
    OsiguranjeComponent,
    RezervacijaComponent,
    HeaderComponent,
    AboutComponent
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
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: CorsInterceptor, multi: true }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
