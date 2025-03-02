import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

import { User, UserResponse } from '#auth/model';

interface UserState {
  user: User | null;
}

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState({ user: null } as UserState),
  withMethods((store) => ({
    setUser({ id, email, username }: UserResponse): void {
      patchState(store, () => ({ user: { id, email, username } }));
    },
  }))
);
