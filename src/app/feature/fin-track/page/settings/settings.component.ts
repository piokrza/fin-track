import { Component } from '@angular/core';

import { ThemeSelectorComponent } from '#fin-track/component/theme-selector';

const imports = [ThemeSelectorComponent];

@Component({
  selector: 'ft-settings',
  template: `
    <ng-container>
      <ft-theme-selector />
    </ng-container>
  `,
  imports,
})
export class SettingsComponent {}
