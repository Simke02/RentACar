import { createReducer, on } from "@ngrx/store";
import { Automobil } from "src/app/models/automobili.model";
import * as AutomobilActions from 'src/app/automobili/store/automobil.action';
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";

export interface Stanje extends EntityState<Automobil> {
    //automobili: Automobil[];
}

export const adapter: EntityAdapter<Automobil> = createEntityAdapter<Automobil>();

const inicijalnoStanje: Stanje = adapter.getInitialState();

export const automobilReducer = createReducer(
    inicijalnoStanje,
    on(AutomobilActions.pribavljanjeUspelo, (stanje, action)=>
        adapter.addMany(action.automobili, stanje)),//({...stanje, automobili: [...stanje.automobili, ...action.automobili]})),
    on(AutomobilActions.ocisti, stanje => adapter.removeAll(stanje)/*({...stanje, automobili: []})*/)
);