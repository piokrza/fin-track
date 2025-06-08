import { Routes } from '@angular/router';

import { Path } from '#core/enum';

export const AuthRoutes: Routes = [
  {
    path: '',
    loadComponent: async () => (await import('#auth/component/auth-container')).AuthContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: Path.LOGIN,
      },
      {
        path: Path.LOGIN,
        title: 'Login',
        loadComponent: async () => (await import('#auth/page/login')).LoginComponent,
      },
      {
        path: Path.SIGNIN,
        title: 'Signin',
        loadComponent: async () => (await import('#auth/page/signin')).SigninComponent,
      },
    ],
  },
];
