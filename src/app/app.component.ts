import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ProgressBarModule } from 'primeng/progressbar';

import { AuthService } from '#auth/service';
import { UserStore } from '#auth/store/user';

const imports = [RouterOutlet, ProgressBarModule];

@Component({
  selector: 'ft-root',
  template: `
    @if (userStore.isProcessing() || userStore.user() === null) {
      <p-progressbar styleClass="absolute" mode="indeterminate" [style]="{ height: '.25rem' }" />
    }
    <router-outlet />
  `,
  styleUrl: './app.component.scss',
  imports,
})
export class AppComponent implements OnInit {
  readonly userStore = inject(UserStore);
  readonly #authService = inject(AuthService);

  ngOnInit(): void {
    this.#authService.setUser$().subscribe();
  }
}
