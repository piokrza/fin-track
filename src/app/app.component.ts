import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

const imports = [RouterOutlet];

@Component({
  selector: 'ft-root',
  template: `<router-outlet />`,
  styleUrl: './app.component.scss',
  imports,
})
export class AppComponent {
  title = 'fin-track';
}
