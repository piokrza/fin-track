import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Path } from '#core/enum';

const routes: Routes = [
  {
    path: '',
    loadComponent: async () => (await import('#ui/component/layout')).LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: Path.DASHBOARD,
      },
      {
        path: Path.DASHBOARD,
        title: 'Dashbord',
        loadComponent: async () => (await import('#fin-track/feature/dashboard')).DashboardComponent,
      },
      {
        path: Path.SETTINGS,
        title: 'Settings',
        loadComponent: async () => (await import('#fin-track/feature/settings')).SettingsComponent,
      },
    ],
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)] })
export class FinTrackViewModule {}
