import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AuthService } from '#auth/service';
import { UserStore } from '#auth/store';
import { Path } from '#core/enum';
import { Link } from '#ui/model';

const imports = [
  RouterLink,
  RouterOutlet,
  MatIconModule,
  MatIconModule,
  MatListModule,
  MatButtonModule,
  RouterLinkActive,
  NgOptimizedImage,
  MatToolbarModule,
  MatSidenavModule,
];

@Component({
  selector: 'ft-layout',
  templateUrl: './layout.component.html',
  imports,
})
export class LayoutComponent {
  readonly #router = inject(Router);
  readonly userStore = inject(UserStore);
  readonly #authService = inject(AuthService);

  readonly user = this.userStore.select('user');
  readonly links: Link[] = [
    {
      label: 'Dashboard',
      routerLink: Path.DASHBOARD,
    },
    {
      label: 'Categories',
      routerLink: Path.CATEGORIES,
    },
    {
      label: 'History',
      routerLink: Path.HISTORY,
    },
    {
      label: 'Budget',
      routerLink: Path.BUDGET,
    },
    {
      label: 'Settings',
      routerLink: Path.SETTINGS,
    },
  ];

  logout(): void {
    this.#authService.logout().then(() => void this.#router.navigate([Path.AUTH]));
  }
}
