import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: async () => (await import('#auth/feature')).AuthComponent,
  },
];
