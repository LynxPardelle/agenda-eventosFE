import { ApplicationConfig, provideZoneChangeDetection, isDevMode, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';

/* Interceptors */
import { TokenInterceptor } from './core/interceptors/token.interceptor';

/* Store */
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { MainEffects } from './state/effects/main.effects';
import { ConfigEffects } from './state/effects/config.effects';
import { SesionEffects } from './state/effects/sesion.effects';
import { ROOT_REDUCERS } from './state/app.state';

/* Enviroment */
import { environment } from '../environments/environment';

/* Language */
import localEs from '@angular/common/locales/es-MX';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localEs);

const APLICATION: string = environment.app;
export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(withFetch()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideEffects([SesionEffects, ConfigEffects, MainEffects]),
    provideStore(ROOT_REDUCERS),
    provideStoreDevtools({
      maxAge: 25, logOnly: !isDevMode(),
      name: APLICATION + 'App',
    }),
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'es-mx' },
  ]
};
