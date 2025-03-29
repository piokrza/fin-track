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
        loadComponent: async () => (await import('#fin-track/view/dashboard')).DashboardComponent,
      },
      {
        path: Path.CATEGORIES,
        title: 'Categories',
        loadComponent: async () => (await import('#fin-track/view/categories')).CategoriesComponent,
      },
      {
        path: Path.SETTINGS,
        title: 'Settings',
        loadComponent: async () => (await import('#fin-track/view/settings')).SettingsComponent,
      },
    ],
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)] })
export class FinTrackModule {}
