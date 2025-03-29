import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LayoutComponent } from '#ui/component/layout';

const imports = [LayoutComponent, RouterOutlet];

@Component({
  selector: 'ft-fin-track',
  template: `
    <ft-layout>
      <router-outlet />
    </ft-layout>
  `,
  imports,
})
export class FinTrackComponent {}
