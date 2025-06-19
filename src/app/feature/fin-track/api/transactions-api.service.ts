import { inject, Injectable } from '@angular/core';
import {
  query,
  where,
  addDoc,
  Firestore,
  collection,
  DocumentData,
  collectionData,
  DocumentReference,
  CollectionReference,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Collection } from '#core/enum';
import { Transaction } from '#fin-track/model';

@Injectable({ providedIn: 'root' })
export class TransactionsApiService {
  readonly #firestore = inject(Firestore);

  getUserTransactions$(userId: string): Observable<Transaction[]> {
    const colRef = collection(this.#firestore, Collection.TRANSACTION) as CollectionReference<Transaction>;
    return collectionData(query(colRef, where('userId', '==', userId)));
  }

  async addTransaction(transaction: Transaction): Promise<DocumentReference<Transaction, DocumentData>> {
    const collectionRef = collection(this.#firestore, Collection.TRANSACTION) as CollectionReference<Transaction>;
    return await addDoc(collectionRef, transaction);
  }
}
