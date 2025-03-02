import { Component, inject } from '@angular/core';

import { UserStore } from '#auth/store/user';
import { LayoutComponent } from '#ui/layout';

const imports = [LayoutComponent];

@Component({
  selector: 'ft-dashboard',
  template: `
    <ft-layout>
      <div class="flex justify-center">
        <h1>Siemaneczko {{ userStore.user()?.username }}!!</h1>
      </div>
    </ft-layout>
  `,
  imports,
})
export class DashboardComponent {
  readonly userStore = inject(UserStore);
}
