import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, exhaustMap, from, map, of, switchMap } from "rxjs";
import * as AutomobilActions from 'src/app/automobili/store/automobil.action';
import { AutomobiliService } from "src/app/services/automobili.service";

@Injectable()
    export class AutomobilEffect {
        nadjiOdgovarajuce = createEffect(() =>
            this.akcije$.pipe(
                ofType(AutomobilActions.inicijalizacija),
                switchMap(podaci =>
                    this.automobilService.VratiOdgovarajuceAutomobile(podaci.tip, podaci.lokacija).pipe(
                        map(automobili => ({ podaci, automobili })),
                        catchError(() => of({ podaci, automobili: [] })) // Handle error as needed
                    )
                ),
                concatMap(({ podaci, automobili }) =>
                    from(this.automobilService.TrenutnoDostupniAutomobili(automobili, podaci.vreme_i, podaci.vreme_v)).pipe(
                        map(automobili => ({ type: '[Automobil] pribavljanjeUspelo', automobili })),
                        catchError(() => of({ type: '[Automobil] pribavljanjeNijeUspelo' })) // Handle error as needed
                    )
                )
            )
        );
    

    constructor(
        private akcije$: Actions,
        private automobilService: AutomobiliService
    ) {}
}