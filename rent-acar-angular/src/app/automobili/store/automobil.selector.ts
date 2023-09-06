import { createFeatureSelector, createSelector } from "@ngrx/store";
import { adapter } from "./automobil.reducer";

export const selectAutomobil = (state: any) => state.stanje;//.automobili;

export const automobiliSelector = createSelector(
    selectAutomobil,
    adapter.getSelectors().selectAll
)