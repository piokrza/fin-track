import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'initials' })
export class InitialsPipe implements PipeTransform {
  transform(displayName: string): string {
    if (!displayName) return '';

    const names = displayName.trim().split(/\s+/);
    const initials = names.slice(0, 2).map((name) => name.charAt(0).toUpperCase());

    return initials.join('');
  }
}
