import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Path } from '#core/enum';

const routes: Routes = [
  {
    path: '',
    loadComponent: async () => (await import('#auth/feature')).AuthComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: Path.LOGIN,
      },
      {
        path: Path.LOGIN,
        loadComponent: async () => (await import('#auth/view/login')).LoginComponent,
      },
      {
        path: Path.SIGNIN,
        loadComponent: async () => (await import('#auth/view/signin')).SigninComponent,
      },
    ],
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)] })
export class AuthModule {}
