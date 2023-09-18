import { createReducer, on } from "@ngrx/store";
import { Automobil } from "src/app/models/automobili.model";
import * as AutomobilActions from 'src/app/automobili/store/automobil.action';
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";

export interface Stanje extends EntityState<Automobil> {
    atribut: string;
    redosled: string;
}

export const adapter: EntityAdapter<Automobil> = createEntityAdapter<Automobil>();

const inicijalnoStanje: Stanje = adapter.getInitialState({
    atribut: "",
    redosled: ""
});

export const automobilReducer = createReducer(
    inicijalnoStanje,
    on(AutomobilActions.pribavljanjeUspelo, (stanje, action)=>
        adapter.addMany(action.automobili, {...stanje})),
    on(AutomobilActions.ocisti, stanje => adapter.removeAll(stanje)),
    on(AutomobilActions.sortiranje, (stanje, action) => ({
        ...stanje,
        atribut: action.atribut,
        redosled: action.redosled
    }))
);