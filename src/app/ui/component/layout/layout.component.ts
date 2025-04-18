import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { ConfirmationService, MegaMenuItem, PrimeIcons } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { MegaMenuModule } from 'primeng/megamenu';
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

import { AuthService } from '#auth/service';
import { UserStore } from '#auth/store/user';
import { Path } from '#core/enum';
import { InitialsPipe } from '#core/pipe';

const imports = [
  PanelModule,
  ToastModule,
  RouterOutlet,
  AvatarModule,
  InitialsPipe,
  ButtonModule,
  ToolbarModule,
  MegaMenuModule,
  ConfirmPopupModule,
];

@Component({
  selector: 'ft-layout',
  template: `
    @let user = userStore.user();
    <div class="flex justify-center">
      <div class="h-screen p-3 w-full max-w-[2100px]">
        <p-panel [showHeader]="false" styleClass="h-full">
          <p-mega-menu styleClass="mt-4" [model]="menuLinks">
            <ng-template #start>
              <p class="text-lg">FinTrack</p>
            </ng-template>

            <ng-template #end>
              <div class="flex items-center gap-3">
                <p-avatar
                  shape="circle"
                  [image]="user?.photoURL ?? ''"
                  [label]="user?.photoURL ? '' : (user?.displayName ?? '' | initials)" />
                <p-button [outlined]="true" [text]="true" [icon]="PrimeIcons.SIGN_OUT" (onClick)="logout($event)" />
              </div>
            </ng-template>
          </p-mega-menu>

          <main class="mt-4">
            <router-outlet />
          </main>
        </p-panel>
      </div>
    </div>

    <p-toast />
    <p-confirm-popup />
  `,
  imports,
})
export class LayoutComponent {
  readonly #router = inject(Router);
  readonly userStore = inject(UserStore);
  readonly #authService = inject(AuthService);
  readonly #confirmationService = inject(ConfirmationService);

  readonly PrimeIcons = PrimeIcons;
  readonly menuLinks: MegaMenuItem[] = [
    {
      label: 'Overview',
      routerLink: Path.DASHBOARD,
    },
    {
      routerLink: Path.CATEGORIES,
      label: 'Categories',
    },
    {
      routerLink: Path.HISTORY,
      label: 'History',
    },
    {
      routerLink: Path.BUDGET,
      label: 'Budget',
    },
    {
      routerLink: Path.SETTINGS,
      label: 'Settings',
    },
  ];

  logout(e: Event): void {
    this.#confirmationService.confirm({
      target: e.target as EventTarget,
      message: 'Are you sure you want to logout?',
      closeOnEscape: true,
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: { label: 'Logout' },
      accept: () => this.#authService.logout().then(() => void this.#router.navigate([Path.AUTH])),
    });
  }
}
