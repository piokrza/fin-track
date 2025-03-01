import { Routes } from '@angular/router';

import { authGuard } from '#auth/guard';
import { Path } from '#core/enum';

export const routes: Routes = [
  {
    path: Path.AUTH,
    loadComponent: async () => (await import('#auth/feature')).AuthComponent,
  },
  {
    path: Path.DASHBOARD,
    canMatch: [authGuard],
    loadComponent: async () => (await import('#dashboard/feature')).DashboardComponent,
  },
];
