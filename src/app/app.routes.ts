import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { Routes } from '@angular/router';

import { Path } from '#core/enum';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: Path.AUTH,
  },
  {
    path: Path.FIN_TRACK,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: () => redirectUnauthorizedTo([Path.AUTH]) },
    loadChildren: async () => (await import('#fin-track/view')).FinTrackViewModule,
  },
  {
    path: Path.AUTH,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: () => redirectLoggedInTo([Path.DASHBOARD]) },
    loadChildren: async () => (await import('#auth/view')).AuthViewModule,
  },
  {
    path: '**',
    redirectTo: Path.FIN_TRACK,
  },
];
