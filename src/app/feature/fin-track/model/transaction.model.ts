import { Timestamp } from '@angular/fire/firestore';

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  category: string;
  createDate: Timestamp;
  type: 'income' | 'expense';
}
