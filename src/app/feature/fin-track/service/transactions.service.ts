import { inject, Injectable } from '@angular/core';
import { DocumentData, DocumentReference } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';

import { UserStore } from '#auth/store';
import { TransactionsApiService } from '#fin-track/api';
import { Transaction } from '#fin-track/model';

@Injectable({ providedIn: 'root' })
export class TransactionsService {
  readonly #userStore = inject(UserStore);
  readonly #transactionsApiService = inject(TransactionsApiService);

  getUserTransactions$(): Observable<Transaction[]> {
    const userId = this.#userStore.select('user')()?.uid ?? '';
    return this.#transactionsApiService.getUserTransactions$(userId);
  }

  addTransaction$(transaction: Transaction): Observable<DocumentReference<Transaction, DocumentData>> {
    return from(this.#transactionsApiService.addTransaction(transaction));
  }
}
