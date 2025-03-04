import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MenuItem, PrimeIcons } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { TooltipModule } from 'primeng/tooltip';

import { UserStore } from '#auth/store/user';
import { Path } from '#core/enum';

const imports = [AvatarModule, TooltipModule, RouterLink];

@Component({
  selector: 'ft-sidebar',
  template: `
    <aside class="mr-4">
      <p-avatar size="large" [label]="'P'" />

      <ul class="mt-8 grid gap-1">
        @for (item of menuItems; track $index) {
          <li class="menu-item" [pTooltip]="item.tooltip" [routerLink]="[item.routerLink]">
            <i [class]="item.icon"></i>
          </li>
        }
      </ul>
    </aside>
  `,
  styleUrl: './sidebar.component.scss',
  imports,
})
export class SidebarComponent {
  readonly userStore = inject(UserStore);

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
  ];
}
