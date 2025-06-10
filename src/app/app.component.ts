import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MatProgressBarModule } from '@angular/material/progress-bar';

import { AuthService } from '#auth/service';
import { ProgressBarService } from '#ui/service';

const imports = [RouterOutlet, MatProgressBarModule];

@Component({
  selector: 'ft-root',
  template: `
    @if (isProcessing()) {
      <mat-progress-bar class="absolute inset-x-0 top-0" mode="indeterminate" [style]="{ height: '.25rem' }" />
    }
    <router-outlet />
  `,
  imports,
})
export class AppComponent implements OnInit {
  readonly #authService = inject(AuthService);

  readonly isProcessing = inject(ProgressBarService).select('isProcessing');

  ngOnInit(): void {
    this.#authService.setUser$().subscribe();
  }
}
