import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { PanelModule } from 'primeng/panel';

import { SidebarComponent } from '#ui/component/sidebar';

const imports = [PanelModule, SidebarComponent, RouterOutlet];

@Component({
  selector: 'ft-layout',
  template: `
    <div class="flex justify-center">
      <div class="h-screen p-3 w-full max-w-[2000px]">
        <p-panel styleClass="h-full">
          <div class="flex gap-3">
            <ft-sidebar />

            <div class="flex-1">
              <router-outlet />
            </div>
          </div>
        </p-panel>
      </div>
    </div>
  `,
  imports,
})
export class LayoutComponent {}
