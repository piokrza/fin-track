import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

import { User, UserResponse } from '#auth/model';

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState({
    id: 0,
    email: '',
    username: '',
  } satisfies User),
  withMethods((store) => ({
    setUser(user: UserResponse): void {
      patchState(store, () => ({
        id: user.id,
        email: user.email,
        username: user.username,
      }));
    },
  }))
);
