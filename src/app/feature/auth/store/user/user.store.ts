import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

import { User, UserResponse } from '#auth/model';

interface UserState {
  user: User | null;
  isLoading: boolean;
}

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState({ user: null, isLoading: false } as UserState),
  withMethods((store) => ({
    setUser(user: UserResponse | null): void {
      patchState(store, () => {
        if (!user) return { user: null };

        const { email, id, username } = user;
        return { user: { id, email, username } };
      });
    },
    setIsLoading(isLoading: boolean): void {
      patchState(store, () => ({ isLoading }));
    },
  }))
);
