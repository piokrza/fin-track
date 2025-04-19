import { Component, inject } from '@angular/core';

import { UserStore } from '#auth/store/user';

@Component({
  selector: 'ft-dashboard',
  template: `
    <!--  -->
    <h1>This is userName: {{ userStore.user()?.displayName }}</h1>
  `,
})
export class DashboardComponent {
  readonly userStore = inject(UserStore);
}
