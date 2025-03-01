import { Routes } from '@angular/router';

import { Path } from '#core/enum';

export const routes: Routes = [
  {
    path: Path.AUTH,
    loadComponent: async () => (await import('#auth/feature')).AuthComponent,
  },
  {
    path: Path.DASHBOARD,
    loadComponent: async () => (await import('#dashboard/component/dashboard')).DashboardComponent,
  },
];
