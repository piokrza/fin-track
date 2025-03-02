import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { UserStore } from '#auth/store/user';
import { Path } from '#core/enum';

export const isAuthenticatedGuard = (): CanActivateFn => {
  return () => {
    const router = inject(Router);
    const userStore = inject(UserStore);

    if (userStore.user()) {
      return true;
    }

    return router.parseUrl(Path.AUTH);
  };
};
