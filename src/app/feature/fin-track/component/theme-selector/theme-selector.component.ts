import { Component, DOCUMENT, inject, Renderer2, signal } from '@angular/core';

import { MatSelectModule } from '@angular/material/select';

import { themes } from '#ui/constant';

const imports = [MatSelectModule];

@Component({
  selector: 'ft-theme-selector',
  template: `
    <mat-form-field>
      <mat-label>Select theme</mat-label>
      <mat-select (valueChange)="themeChange($event)" [value]="selected()">
        @for (theme of themes; track $index) {
          <mat-option [value]="theme">{{ theme }}</mat-option>
        }
      </mat-select>
    </mat-form-field>
  `,
  imports,
})
export class ThemeSelectorComponent {
  readonly #document = inject(DOCUMENT);
  readonly #renderer = inject(Renderer2);

  readonly themes = themes;
  readonly selected = signal(localStorage.getItem('theme') ?? 'theme-green');

  themeChange(theme: string): void {
    this.themes.forEach((t) => this.#renderer.removeClass(this.#document.body, t));

    this.#renderer.addClass(this.#document.body, theme);
    this.selected.set(theme);
    localStorage.setItem('theme', theme);
  }
}
