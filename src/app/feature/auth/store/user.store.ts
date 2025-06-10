import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';

import { Store } from '#core/abstract';
import { Nullable } from '#core/model';

interface UserState {
  isProcessing: boolean;
  user: Nullable<User>;
}

@Injectable({ providedIn: 'root' })
export class UserStore extends Store<UserState> {
  constructor() {
    super({
      user: null,
      isProcessing: false,
    });
  }
}

// export const UserStore = signalStore(
//   { providedIn: 'root' },
//   withState<UserState>({
//     user: null,
//     isProcessing: false,
//   }),
//   withMethods((store) => ({
//     setUser(user: User | null) {
//       patchState(store, () => ({ user }));
//     },

//     setIsProcessing(isProcessing: boolean) {
//       patchState(store, () => ({ isProcessing }));
//     },
//   }))
// );
