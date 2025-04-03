import { Routes } from '@angular/router';
/* Components */
import { HomeComponent } from './core/components/home/home.component';
import { AboutComponent } from './core/components/about/about.component';
import { ErrorComponent } from './core/components/error/error.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'evento',
    loadChildren: () =>
      import('./evento/evento.module').then((m) => m.EventoModule),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./user/user.module').then((m) => m.UserModule),
  },
  { path: '**', component: ErrorComponent },
];
