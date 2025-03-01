import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

import { User } from '#auth/model';

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState({
    id: NaN,
    email: '',
    display: '',
    username: '',
    has_usable_password: false,
  } satisfies User),
  withMethods((store) => ({
    setUser(user: User): void {
      patchState(store, () => ({ ...user, has_usable_password: undefined }));
    },
  }))
);
