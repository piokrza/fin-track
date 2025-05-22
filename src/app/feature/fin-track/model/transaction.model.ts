import { Timestamp } from '@angular/fire/firestore';

export interface Transaction {
  id: string;
  uid: string;
  amount: string;
  category: string;
  createDate: Timestamp;
}
