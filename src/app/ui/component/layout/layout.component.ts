import { NgOptimizedImage } from '@angular/common';
import { Component, DOCUMENT, inject, OnInit, signal } from '@angular/core';
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
import { BreakpointService } from '#ui/service';

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
  styleUrl: './layout.component.scss',
  imports,
})
export class LayoutComponent implements OnInit {
  readonly #router = inject(Router);
  readonly #document = inject(DOCUMENT);
  readonly userStore = inject(UserStore);
  readonly #authService = inject(AuthService);

  readonly isOverMdBreakpoint = inject(BreakpointService).observe('md');
  readonly isDarkMode = signal(JSON.parse(localStorage.getItem('isDarkMode') ?? 'false'));

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

  ngOnInit(): void {
    this.setColorScheme(this.isDarkMode());
  }

  logout(): void {
    this.#authService.logout().then(() => void this.#router.navigate([Path.AUTH]));
  }

  toggleTheme(): void {
    this.isDarkMode.set(!this.isDarkMode());

    this.setColorScheme(this.isDarkMode());
    localStorage.setItem('isDarkMode', this.isDarkMode());
  }

  setColorScheme(isDarkMode: boolean): void {
    this.#document.documentElement.style.setProperty('color-scheme', isDarkMode ? 'dark' : 'light');
  }
}
