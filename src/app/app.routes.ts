import { Routes } from '@angular/router';

import { isAuthenticatedGuard } from '#auth/guard';
import { Path } from '#core/enum';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: Path.FIN_TRACK,
  },
  {
    path: Path.FIN_TRACK,
    canMatch: [isAuthenticatedGuard()],
    loadChildren: async () => (await import('#fin-track/view')).FinTrackViewModule,
  },
  {
    path: Path.AUTH,
    loadChildren: async () => (await import('#auth/view')).AuthViewModule,
  },
  {
    path: '**',
    redirectTo: Path.FIN_TRACK,
  },
];
