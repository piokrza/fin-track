import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { UserStore } from '#auth/store/user';
import { Path } from '#core/enum';

export const isAuthenticatedGuard = (): CanActivateFn => {
  return () => (inject(UserStore).user() ? true : inject(Router).parseUrl(Path.AUTH));
};
