import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { ConfirmationService, MenuItem, PrimeIcons } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { TooltipModule } from 'primeng/tooltip';

import { AuthService } from '#auth/service';
import { UserStore } from '#auth/store/user';
import { Path } from '#core/enum';

const imports = [AvatarModule, TooltipModule, RouterLink, ConfirmPopupModule];

@Component({
  selector: 'ft-sidebar',
  template: `
    <aside class="mr-4">
      <p-avatar size="large" [label]="userInitial()" />

      <ul class="mt-8 grid gap-1">
        @for (item of menuItems; track $index) {
          @if (item.command) {
            <p-confirmpopup />
          }
          <li
            tabindex="0"
            class="flex justify-center items-center p-4 cursor-pointer rounded-sm hover:bg-(--p-surface-700)"
            [pTooltip]="item.tooltip"
            [routerLink]="item.routerLink ? [item.routerLink] : undefined"
            (click)="handleClick($event, item.command)"
            (keyup.enter)="handleClick($event, item.command)">
            <i [class]="item.icon"></i>
          </li>
        }
      </ul>
    </aside>
  `,
  imports,
})
export class SidebarComponent {
  readonly #router = inject(Router);
  readonly #userStore = inject(UserStore);
  readonly #authService = inject(AuthService);
  readonly #confirmationService = inject(ConfirmationService);

  readonly userInitial = computed(() => this.#userStore.user()?.username.substring(0, 1).toUpperCase());
  readonly menuItems: MenuItem[] = [
    {
      icon: PrimeIcons.HOME,
      tooltip: 'Dashboard',
      routerLink: Path.DASHBOARD,
    },
    {
      icon: PrimeIcons.ANDROID,
      routerLink: Path.SETTINGS,
      tooltip: 'Settings',
    },
    {
      icon: PrimeIcons.SIGN_OUT,
      tooltip: 'Logout',
      command: (event) => {
        this.confirmLogout(event as Event);
      },
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleClick(event: Event, command?: any) {
    if (command) command(event);
  }

  confirmLogout(event: Event) {
    this.#confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to logout?',
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
