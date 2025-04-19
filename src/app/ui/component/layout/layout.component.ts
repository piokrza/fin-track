import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { MenuItem, PrimeIcons } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { MenubarModule } from 'primeng/menubar';
import { PanelModule } from 'primeng/panel';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

import { AuthService } from '#auth/service';
import { UserStore } from '#auth/store';
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
  MenubarModule,
  TieredMenuModule,
  ConfirmPopupModule,
];

@Component({
  selector: 'ft-layout',
  template: `
    @let user = userStore.user();
    <div class="flex justify-center">
      <div class="h-screen p-3 w-full max-w-[2100px]">
        <p-panel [showHeader]="false" styleClass="h-full">
          <p-menubar styleClass="mt-4" [model]="menuLinks">
            <ng-template #start>
              <p class="text-lg">FinTrack</p>
            </ng-template>

            <ng-template #end>
              <div class="flex items-center gap-3">
                <p-avatar
                  class="cursor-pointer"
                  shape="circle"
                  [image]="user?.photoURL ?? ''"
                  [label]="user?.photoURL ? '' : (user?.displayName ?? '' | initials)"
                  (click)="tieredMenu.toggle($event)" />
                <p-tieredmenu #tieredMenu [model]="tieredMenuItems" [popup]="true" />
              </div>
            </ng-template>
          </p-menubar>

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

  readonly PrimeIcons = PrimeIcons;
  readonly menuLinks: MenuItem[] = [
    { label: 'Overview', routerLink: Path.DASHBOARD },
    { routerLink: Path.CATEGORIES, label: 'Categories' },
    { routerLink: Path.HISTORY, label: 'History' },
    { routerLink: Path.BUDGET, label: 'Budget' },
    { routerLink: Path.SETTINGS, label: 'Settings' },
  ];
  readonly tieredMenuItems: MenuItem[] = [
    {
      label: 'Logout',
      icon: PrimeIcons.SIGN_OUT,
      command: () => {
        this.#authService.logout().then(() => void this.#router.navigate([Path.AUTH]));
      },
    },
  ];
}
