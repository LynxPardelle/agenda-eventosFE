import { ActionReducerMap } from '@ngrx/store';
/* Interfaces */
import { IConfigState } from '../core/interfaces/config.state';
import { IMainState } from '../core/interfaces/main.state';
import { ISesion } from '../auth/interfaces/sesion';
/* Reducers */
import { ConfigReducer } from './reducers/config.reducer';
import { SesionReducer } from './reducers/sesion.reducer';
import { MainReducer } from './reducers/main.reducer';
export interface AppState {
  sesion: ISesion;
  config: IConfigState;
  main: IMainState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  config: ConfigReducer,
  sesion: SesionReducer,
  main: MainReducer,
};
