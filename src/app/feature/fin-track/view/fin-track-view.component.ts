import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { UserStore } from '#auth/store/user';
import { LayoutComponent } from '#ui/component/layout';

const imports = [LayoutComponent, RouterOutlet];

@Component({
  selector: 'ft-view',
  template: `
    <ft-layout>
      <router-outlet />
    </ft-layout>
  `,
  imports,
})
export class ViewComponent {
  readonly userStore = inject(UserStore);
}
