import { createAction, props } from "@ngrx/store";
import { Automobil } from "src/app/models/automobili.model";

export const inicijalizacija = createAction(
    '[Automobil] Inicijalizacija',
    props<{ tip: string, lokacija: string, vreme_i: string, vreme_v: string }>()
);

export const pribavljanjeUspelo = createAction(
    '[Automobil] pribavljanjeUspelo',
    props<{ automobili: Automobil[] }>()
)

export const pribavljanjeNijeUspelo = createAction(
    '[Automobil] pribavljanjeNijeUspelo'
)

export const ocisti = createAction(
    '[Automobil] ocisti'
)

export const sortiranje = createAction(
    '[Automobil] sortiranje',
    props<{atribut: string, redosled: string}>()
)