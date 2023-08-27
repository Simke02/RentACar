import { createAction, props } from "@ngrx/store";
import { Automobil } from "src/app/models/automobili.model";

export const inicijalizacija = createAction(
    '[Automobil] Inicijalizacija',
    props<{ tip: string, lokacija: string, vreme_i: Date, vreme_v: Date }>()
);

export const pribavljanjeUspelo = createAction(
    '[Automobil] pribavljanjeUspelo',
    props<{ automobili: Automobil[] }>()
)

export const pribavljanjeNijeUspelo = createAction(
    '[Automobil] pribavljanjeNijeUspelo'
)