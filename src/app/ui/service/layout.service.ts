import { DOCUMENT, inject, Injectable, signal } from '@angular/core';

import { Key, Path } from '#core/enum';
import { themes } from '#ui/constant';
import { Link } from '#ui/model';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  readonly #document = inject(DOCUMENT);

  readonly isDarkMode = signal(JSON.parse(localStorage.getItem(Key.IS_DARK_MODE) ?? 'false'));
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

  initTheme(): void {
    this.setTheme();
    this.setColorScheme();
  }

  toggleIsDarkMode(): void {
    this.isDarkMode.set(!this.isDarkMode());

    this.setColorScheme(this.isDarkMode());
    localStorage.setItem(Key.IS_DARK_MODE, this.isDarkMode());
  }

  private setTheme(): void {
    const theme = localStorage.getItem('theme') ?? 'theme-green';
    themes.forEach((t) => this.#document.body.classList.remove(t));
    this.#document.body.classList.add(theme);
  }

  private setColorScheme(isDarkMode?: boolean): void {
    if (isDarkMode === undefined) isDarkMode = this.isDarkMode();
    this.#document.body.style.setProperty('color-scheme', isDarkMode ? 'dark' : 'light');
  }
}
