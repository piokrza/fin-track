import { Routes } from '@angular/router';

import { isAuthenticatedGuard } from '#auth/guard';
import { Path } from '#core/enum';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: Path.DASHBOARD,
  },
  {
    path: Path.DASHBOARD,
    canMatch: [isAuthenticatedGuard],
    loadComponent: async () => (await import('#dashboard/feature')).DashboardComponent,
  },
  {
    path: Path.AUTH,
    loadChildren: async () => (await import('#auth/feature')).AuthModule,
  },
];
