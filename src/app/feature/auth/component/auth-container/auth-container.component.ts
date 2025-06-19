import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

import { MatCardModule } from '@angular/material/card';

const imports = [FormsModule, MatCardModule, RouterOutlet];

@Component({
  selector: 'ft-auth-container',
  template: `
    <section class="h-screen flex justify-center items-center p-4 bg-(--mat-sys-surface-container)">
      <div class="w-full max-w-lg">
        <mat-card class="p-4">
          <router-outlet />
        </mat-card>
      </div>
    </section>
  `,
  imports,
})
export class AuthContainerComponent {}
