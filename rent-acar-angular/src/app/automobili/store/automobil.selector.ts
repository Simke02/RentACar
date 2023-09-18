import { createFeatureSelector, createSelector } from "@ngrx/store";
import { adapter } from "./automobil.reducer";
import { Automobil } from "src/app/models/automobili.model";

export const selectAutomobil = (state: any) => state.stanje;//.automobili;

export const automobiliSelector = createSelector(
    selectAutomobil,
    adapter.getSelectors().selectAll
)

export const atrRedSelector = createSelector(
    selectAutomobil,
    (stanje) => ({atribut: stanje.atribut, redosled: stanje.redosled})
)

export const sortiraniAutomobiliSelector = createSelector(
    automobiliSelector,
    atrRedSelector,
    (automobili, atrRed) => 
    {   
        type automobiliKey = keyof typeof automobili[0];
        const atributP = String(atrRed.atribut) as automobiliKey;
        if(atrRed.atribut!=="marka"){
            if(atrRed.redosled === "desc")
                return automobili.slice().sort((a, b)=> b[atributP] as number - (a[atributP] as number))
            else
                return automobili.slice().sort((a, b)=> a[atributP] as number - (b[atributP] as number))
        }
        else{
            if(atrRed.redosled === "desc")
            return automobili.slice().sort((a, b) => b.marka.localeCompare(a.marka))
        else
            return automobili.slice().sort((a, b) => a.marka.localeCompare(b.marka))
        }
    }
)