import { inject, Injectable } from '@angular/core';
/* RxJs */
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
/* Services */
/* Store */
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as MainActions from '../actions/main.actions';
import { CoreService } from '../../core/services/core.service';
@Injectable()
export class MainEffects {
  private readonly actions$ = inject(Actions);
  constructor(private _coreService: CoreService) {}
  LoadMainn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MainActions.LoadMain),
      mergeMap(() => {
        return this._coreService.getMain().pipe(
          map((r: any) => {
            if (r.main) {
              return MainActions.MainLoaded({
                main: r.main,
              });
            } else {
              return MainActions.ErrorMain({ error: r });
            }
          }),
          catchError((e) => of(MainActions.ErrorMain({ error: e })))
        );
      })
    )
  );

}
