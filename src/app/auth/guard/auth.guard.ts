import { inject } from '@angular/core';
/* RxJs */
import { Observable, map } from 'rxjs';
/* Interfaces */
import { ISesion } from '../interfaces/sesion';
import { IRole } from '../../shared/interfaces/role';
/* Store */
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { SharedService } from '../../shared/services/shared.service';
import { SesionSelector } from '../../state/selectors/sesion.selector';

sesion$: Observable<ISesion | undefined>;
export const isAuth = (
  type: IRole | '' = '',
  store = inject(Store<AppState>),
  sharedService = inject(SharedService)
) => {
  return store
    .select(SesionSelector)
    .pipe(
      map(
        (sesion: ISesion) =>
          !!sesion.active &&
          (type === '' ||
            (sesion.identity &&
              sharedService.checkRole(
                sesion.identity?.roleType,
                sesion.identity?.generalRole,
                type
              )))
      )
    );
};
