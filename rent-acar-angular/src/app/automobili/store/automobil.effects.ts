import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of } from "rxjs";
import * as AutomobilActions from 'src/app/automobili/store/automobil.action';
import { AutomobiliService } from "src/app/services/automobili.service";

@Injectable()
export class AutomobilEffect {
    nadjiOdgovarajuce = createEffect(() =>
        this.akcije$.pipe(
            ofType(AutomobilActions.inicijalizacija),
            exhaustMap(podaci=>
                this.automobilService.VratiOdgovarajuceAutomobile(podaci.tip, podaci.lokacija)
                .pipe(
                    map(automobili => ({type: '[Automobil] pribavljanjeUspelo', automobili: automobili})),
                    catchError(() => of({type: '[Automobil] pribavljanjeNijeUspelo'}))
                )
            )
        )
    )

    constructor(
        private akcije$: Actions,
        private automobilService: AutomobiliService
    ) {}
}