import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

import { UserInfo } from '#auth/model';

interface UserState {
  user: UserInfo | null | undefined;
}

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState({ user: null, isLoading: false } as UserState),
  withMethods((store) => ({
    setUser(user: UserInfo | null) {
      patchState(store, () => ({ user }));
    },
  }))
);
