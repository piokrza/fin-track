import { Component, DestroyRef, inject } from '@angular/core';
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
import { LayoutService } from '#ui/service';
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
export class LayoutComponent {
  readonly #router = inject(Router);
  readonly #dialog = inject(MatDialog);
  readonly #destroyRef = inject(DestroyRef);
  readonly #authService = inject(AuthService);
  readonly #layoutService = inject(LayoutService);

  readonly isOverMdBreakpoint = inject(BreakpointService).observe('md');
  readonly isDarkMode = this.#layoutService.isDarkMode;

  readonly links = this.#layoutService.links;

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
        tap(async (decision) => decision && this.#authService.logout().then(() => void this.#router.navigate([Path.AUTH]))),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe();
  }

  toggleTheme(): void {
    this.#layoutService.toggleIsDarkMode();
  }
}
