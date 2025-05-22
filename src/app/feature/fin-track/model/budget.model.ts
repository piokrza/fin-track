import { Category } from '#fin-track/model';

export interface Budget {
  id: string;
  uid: string;
  amount: string;
  categories: Category[];
}
