import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

import { CardModule } from 'primeng/card';
import { SelectButtonModule } from 'primeng/selectbutton';

const imports = [SelectButtonModule, FormsModule, CardModule, RouterOutlet];

@Component({
  selector: 'ft-auth',
  template: `
    <section class="h-screen flex justify-center items-center">
      <p-card>
        <router-outlet />
      </p-card>
    </section>
  `,
  imports,
})
export class AuthComponent {}
