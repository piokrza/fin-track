import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ToastModule } from 'primeng/toast';

import { AuthService } from '#auth/service';

const imports = [RouterOutlet, ToastModule];

@Component({
  selector: 'ft-root',
  template: `
    <router-outlet />
    <p-toast />
  `,
  styleUrl: './app.component.scss',
  imports,
})
export class AppComponent implements OnInit {
  readonly #authService = inject(AuthService);

  title = 'fin-track';

  ngOnInit(): void {
    this.#authService.checkAuth();
  }
}
