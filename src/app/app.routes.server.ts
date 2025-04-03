import { RenderMode, ServerRoute } from '@angular/ssr';
import { RecoverComponent } from './auth/components/recover/recover.component';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'auth/recover/:userId/:recoverCode',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: () => {
      return Promise.resolve([
        { userId: 'placeholder-id', recoverCode: 'placeholder-code' }
        // Add more combinations if needed
      ]);
    }
  },
  {
    path: 'evento/evento/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: () => {
      return Promise.resolve([
        { id: 'placeholder-id' }
        // Add more combinations if needed
      ]);
    }
  },
  {
    path: 'evento/evento-list/:page',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: () => {
      return Promise.resolve([
        { page: '1' }
        // Add more combinations if needed
      ]);
    }
  },
  {
    path: 'user/user/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: () => {
      return Promise.resolve([
        { id: 'placeholder-id' }
        // Add more combinations if needed
      ]);
    }
  },
  {
    path: 'user/user-list/:page',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: () => {
      return Promise.resolve([
        { page: '1' }
        // Add more combinations if needed
      ]);
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
