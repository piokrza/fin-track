import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AuthService } from '#auth/service';
import { ProgressBarComponent } from '#ui/component/progress-bar';

const imports = [RouterOutlet, ProgressBarComponent];

@Component({
  selector: 'ft-root',
  template: `
    <ft-progress-bar />
    <router-outlet />
  `,
  imports,
})
export class AppComponent implements OnInit {
  readonly #authService = inject(AuthService);

  ngOnInit(): void {
    this.#authService.setUser$().subscribe();
  }
}
