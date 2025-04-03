import { createReducer, on } from '@ngrx/store';
import * as SesionActions from '../actions/sesion.actions';
import { ISesion } from '../../auth/interfaces/sesion';
/* Environment */
import { environment } from '../../../environments/environment';
const initialState: ISesion = {
  active: false,
};

const APLICATION: string = environment.app;

export const SesionReducer = createReducer(
  initialState,
  on(SesionActions.LoadSesion, (s) => {
    return { ...s, active: false };
  }),
  on(SesionActions.SesionLoaded, (s, { sesion }) => {
    localStorage.setItem(
      APLICATION + 'identity',
      JSON.stringify(sesion.identity)
    );
    localStorage.setItem(APLICATION + 'token', JSON.stringify(sesion.token));
    return {
      ...s,
      active: sesion.active,
      identity: sesion.identity,
      token: sesion.token,
    };
  }),
  on(SesionActions.CloseSesion, (s) => {
    localStorage.removeItem(APLICATION + 'identity');
    localStorage.removeItem(APLICATION + 'token');
    return { ...s, active: false };
  }),
  on(SesionActions.ErrorSesion, (s) => {
    localStorage.removeItem(APLICATION + 'identity');
    localStorage.removeItem(APLICATION + 'token');
    return { ...s, active: false };
  })
);
