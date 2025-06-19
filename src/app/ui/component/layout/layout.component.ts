import { Component, DestroyRef, DOCUMENT, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { tap } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AuthService } from '#auth/service';
import { Path } from '#core/enum';
import { ConfirmDialogComponent, ConfirmDialogData } from '#ui/component/confirm-dialog';
import { ProfileComponent } from '#ui/component/layout/component/profile';
import { links } from '#ui/constant';
import { BreakpointService } from '#ui/service';

const imports = [
  RouterLink,
  RouterOutlet,
  MatIconModule,
  MatIconModule,
  MatListModule,
  MatButtonModule,
  ProfileComponent,
  RouterLinkActive,
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
  readonly #dialog = inject(MatDialog);
  readonly #document = inject(DOCUMENT);
  readonly #destroyRef = inject(DestroyRef);
  readonly #authService = inject(AuthService);

  readonly isOverMdBreakpoint = inject(BreakpointService).observe('md');
  readonly isDarkMode = signal(JSON.parse(localStorage.getItem('isDarkMode') ?? 'false'));

  readonly links = links;

  ngOnInit(): void {
    this.setColorScheme(this.isDarkMode());
  }

  logout(): void {
    this.#dialog
      .open(ConfirmDialogComponent, {
        data: {
          title: '',
          description: 'dwad',
        } satisfies ConfirmDialogData,
      })
      .afterClosed()
      .pipe(
        tap((decision) => {
          if (decision) {
            this.#authService.logout().then(() => void this.#router.navigate([Path.AUTH]));
          }
        }),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe();
  }

  toggleTheme(): void {
    this.isDarkMode.set(!this.isDarkMode());

    this.setColorScheme(this.isDarkMode());
    localStorage.setItem('isDarkMode', this.isDarkMode());
  }

  setColorScheme(isDarkMode: boolean): void {
    this.#document.body.style.setProperty('color-scheme', isDarkMode ? 'dark' : 'light');
  }
}
