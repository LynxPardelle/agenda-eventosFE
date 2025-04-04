import { createAction, props } from '@ngrx/store';
import { ISesion } from '../../auth/interfaces/sesion';

export const LoadSesion = createAction('[Sesion] Inactive Sesion');
export const SesionLoaded = createAction(
  '[Sesion] Sesion Loaded',
  props<{ sesion: ISesion }>()
);
export const CloseSesion = createAction('[Sesion] Close Sesion');
export const ErrorSesion = createAction('[Sesion] Error Sesion');
