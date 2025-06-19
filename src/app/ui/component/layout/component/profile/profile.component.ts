import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { AuthService } from '#auth/service';
import { UserStore } from '#auth/store';
import { Path } from '#core/enum';

const imports = [MatMenuModule, NgOptimizedImage, MatIconModule];

@Component({
  selector: 'ft-profile',
  template: `
    <div class="flex items-center gap-4 cursor-pointer p-2 rounded-xl hover:var(--mat-sys-surface-container)" [matMenuTriggerFor]="menu">
      <img class="rounded-full shrink-0 w-11 h-11" width="40" height="40" alt="avatar" [ngSrc]="user()?.photoURL ?? ''" />
      <div>
        <div class="text-sm">{{ user()?.displayName }}</div>
        <div class="text-xs">{{ user()?.email }}</div>
      </div>
    </div>

    <mat-menu #menu="matMenu" class="w-[300px]">
      <button mat-menu-item (click)="logout()">
        <mat-icon>logout</mat-icon>
        <span>Logout</span>
      </button>
    </mat-menu>
  `,
  imports,
})
export class ProfileComponent {
  readonly #router = inject(Router);
  readonly #authService = inject(AuthService);

  readonly user = inject(UserStore).select('user');

  async logout(): Promise<void> {
    this.#authService.logout().then(() => void this.#router.navigate([Path.AUTH]));
  }
}
