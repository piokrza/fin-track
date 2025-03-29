import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ToastModule } from 'primeng/toast';

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
export class AppComponent {}
