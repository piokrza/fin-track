import { inject, Injectable } from '@angular/core';
import {
  Auth,
  User,
  user,
  signOut,
  updateProfile,
  UserCredential,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from '@angular/fire/auth';
import { from, Observable, tap } from 'rxjs';

import { AuthPayload } from '#auth/model';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  readonly #firebaseAuth = inject(Auth);

  get user$(): Observable<User | null> {
    return user(this.#firebaseAuth);
  }

  signin$(payload: AuthPayload): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.#firebaseAuth, payload.email, payload.password)).pipe(
      tap(async ({ user }) => await updateProfile(user, { displayName: payload.username }))
    );
  }

  login$(payload: AuthPayload): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.#firebaseAuth, payload.email, payload.password));
  }

  async logout(): Promise<void> {
    return await signOut(this.#firebaseAuth);
  }
}
