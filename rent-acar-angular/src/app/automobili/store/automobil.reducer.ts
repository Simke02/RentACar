import { createReducer, on } from "@ngrx/store";
import { Automobil } from "src/app/models/automobili.model";
import * as AutomobilActions from 'src/app/automobili/store/automobil.action';

export interface Stanje {
    automobili: Automobil[];
}

const inicijalnoStanje: Stanje = {
    automobili: [],
};

export const automobilReducer = createReducer(
    inicijalnoStanje,
    on(AutomobilActions.pribavljanjeUspelo, (stanje, action)=>
        ({...stanje, automobili: [...stanje.automobili, ...action.automobili]}))
);

/*{id: 1, marka:"a", model:"a", broj_sedista:"2", snaga_motora:"a", gorivo:"a", klima:true, registracija:"a", tip:"a", transmisija:"a", godiste:"a", dodatno_osiguranje:1, cena:1, slika:"a", lokacija:"a"}*/