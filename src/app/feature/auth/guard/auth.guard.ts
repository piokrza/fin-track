import { CanActivateFn } from '@angular/router';
import { of } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  return of(true);
};
