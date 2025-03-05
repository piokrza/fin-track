import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Path } from '#core/enum';

const routes: Routes = [
  {
    path: '',
    loadComponent: async () => (await import('#auth/view')).AuthViewComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: Path.LOGIN,
      },
      {
        path: Path.LOGIN,
        loadComponent: async () => (await import('#auth/feature/login')).LoginComponent,
      },
      {
        path: Path.SIGNIN,
        loadComponent: async () => (await import('#auth/feature/signin')).SigninComponent,
      },
    ],
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)] })
export class AuthViewModule {}
