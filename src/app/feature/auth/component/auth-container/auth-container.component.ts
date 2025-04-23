import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

import { CardModule } from 'primeng/card';
import { SelectButtonModule } from 'primeng/selectbutton';

const imports = [SelectButtonModule, FormsModule, CardModule, RouterOutlet];

@Component({
  selector: 'ft-auth-container',
  template: `
    <section class="h-screen flex justify-center items-center p-4">
      <div class="w-full max-w-lg">
        <p-card styleClass="w-full">
          <router-outlet />
        </p-card>
      </div>
    </section>
  `,
  imports,
})
export class AuthContainerComponent {}
