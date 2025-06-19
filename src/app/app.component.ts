import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

import { MatProgressBarModule } from '@angular/material/progress-bar';

import { AuthService } from '#auth/service';
import { routeTransition } from '#ui/constant';
import { LayoutService, ProgressBarService } from '#ui/service';

const animations = [routeTransition];
const imports = [RouterOutlet, MatProgressBarModule];

@Component({
  selector: 'ft-root',
  template: `
    @if (isProcessing()) {
      <mat-progress-bar class="absolute inset-x-0 top-0" mode="indeterminate" />
    }
    <div [@routeTransition]="activatedRouteData.snapshot.data" style="display: contents">
      <router-outlet />
    </div>
  `,
  animations,
  imports,
})
export class AppComponent implements OnInit {
  readonly #authService = inject(AuthService);
  readonly #layoutService = inject(LayoutService);

  readonly activatedRouteData = inject(ActivatedRoute);
  readonly isProcessing = inject(ProgressBarService).select('isProcessing');

  ngOnInit(): void {
    this.#layoutService.setColorScheme();
    this.#authService.setUser$().subscribe();
  }
}
