import { User } from '@angular/fire/auth';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

import { Nullable } from '#core/model';

interface UserState {
  isProcessing: boolean;
  user: Nullable<User>;
}

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState<UserState>({
    user: null,
    isProcessing: false,
  }),
  withMethods((store) => ({
    setUser(user: User | null) {
      patchState(store, () => ({ user }));
    },

    setIsProcessing(isProcessing: boolean) {
      patchState(store, () => ({ isProcessing }));
    },
  }))
);
