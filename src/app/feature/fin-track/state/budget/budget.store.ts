import { User } from '@angular/fire/auth';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

interface UserState {
  isProcessing: boolean;
  user: User | null | undefined;
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
