import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { MenuItem, PrimeIcons } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { TooltipModule } from 'primeng/tooltip';

import { AuthService } from '#auth/service';
import { Path } from '#core/enum';

const imports = [AvatarModule, TooltipModule, RouterLink];

@Component({
  selector: 'ft-sidebar',
  template: `
    <aside class="mr-4">
      <p-avatar size="large" [label]="'P'" />

      <ul class="mt-8 grid gap-1">
        @for (item of menuItems; track $index) {
          <li
            tabindex="0"
            class="flex justify-center items-center p-4 cursor-pointer rounded-sm hover:bg-(--p-surface-700)"
            [pTooltip]="item.tooltip"
            [routerLink]="[item.routerLink]"
            (click)="handleClick(item.command)"
            (keyup.enter)="handleClick(item.command)">
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
  readonly #authService = inject(AuthService);

  readonly menuItems: MenuItem[] = [
    {
      icon: PrimeIcons.HOME,
      tooltip: 'Dashboard',
      routerLink: Path.DASHBOARD,
      command: () => {
        //
      },
    },
    {
      icon: PrimeIcons.ANDROID,
      routerLink: Path.SETTINGS,
      tooltip: 'Settings',
      command: () => {
        //
      },
    },
    {
      icon: PrimeIcons.SIGN_OUT,
      tooltip: 'Logout',
      command: () => {
        this.#authService.logout();
        this.#router.navigate([Path.AUTH]);
      },
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleClick(command?: any) {
    if (command) {
      command();
    }
  }
}
