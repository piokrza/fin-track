import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { PanelModule } from 'primeng/panel';

import { SidebarComponent } from '#ui/component/sidebar';
import { TitleService } from '#ui/service';

const imports = [PanelModule, SidebarComponent, RouterOutlet];

@Component({
  selector: 'ft-layout',
  template: `
    <div class="h-screen p-3">
      <p-panel styleClass="h-full">
        <div class="flex gap-3">
          <ft-sidebar />

          <div class="flex-1">
            <h1 class="mb-4 text-2xl">{{ title() }}</h1>
            <router-outlet />
          </div>
        </div>
      </p-panel>
    </div>
  `,
  imports,
})
export class LayoutComponent {
  readonly #titleService = inject(TitleService);

  readonly title = this.#titleService.title;
}
