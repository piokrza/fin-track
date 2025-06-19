import { DOCUMENT, inject, Injectable, signal } from '@angular/core';

import { Path } from '#core/enum';
import { Link } from '#ui/model';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  readonly #document = inject(DOCUMENT);

  readonly isDarkMode = signal(JSON.parse(localStorage.getItem('isDarkMode') ?? 'false'));
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

  setColorScheme(isDarkMode?: boolean): void {
    if (isDarkMode === undefined) isDarkMode = this.isDarkMode();
    this.#document.body.style.setProperty('color-scheme', isDarkMode ? 'dark' : 'light');
  }

  toggleTheme(): void {
    this.isDarkMode.set(!this.isDarkMode());

    this.setColorScheme(this.isDarkMode());
    localStorage.setItem('isDarkMode', this.isDarkMode());
  }
}
