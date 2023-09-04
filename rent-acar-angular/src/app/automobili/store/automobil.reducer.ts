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
        ({...stanje, automobili: [...stanje.automobili, ...action.automobili]})),
    on(AutomobilActions.ocisti, stanje => ({...stanje, automobili: []}))
);