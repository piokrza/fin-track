import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'initials' })
export class InitialsPipe implements PipeTransform {
  transform(displayName: string): string {
    if (!displayName) return '';

    const names = displayName.trim().split(/\s+/);
    const initials: string[] = [];

    if (names.length === 1) {
      initials.push(names[0].charAt(0).toUpperCase());
    } else if (names.length >= 2) {
      initials.push(names[0].charAt(0).toUpperCase());

      const lastNameParts = names[names.length - 1].split('-');
      lastNameParts.forEach((part) => {
        if (part) {
          initials.push(part.charAt(0).toUpperCase());
        }
      });
    }

    return initials.join('');
  }
}
