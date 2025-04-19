import { Routes } from '@angular/router';

import { Path } from '#core/enum';

export const FinTrackRoutes: Routes = [
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
        loadComponent: async () => (await import('#fin-track/page/dashboard')).DashboardComponent,
      },
      {
        path: Path.HISTORY,
        title: 'History',
        loadComponent: async () => (await import('#fin-track/page/history')).HistoryComponent,
      },
      {
        path: Path.BUDGET,
        title: 'Budget',
        loadComponent: async () => (await import('#fin-track/page/budget')).BudgetComponent,
      },
      {
        path: Path.CATEGORIES,
        title: 'Categories',
        loadComponent: async () => (await import('#fin-track/page/categories')).CategoriesComponent,
      },
      {
        path: Path.SETTINGS,
        title: 'Settings',
        loadComponent: async () => (await import('#fin-track/page/settings')).SettingsComponent,
      },
    ],
  },
];
