import { IBillItem } from './bill-item';

export interface IDraftBill {
  payer?: any;
  payee?: any;
  venue?: any;
  effectStartDate?: string;
  effectEndDate?: string;
  payDate: string;
  items?: IBillItem[];
  note?: string;
}

export interface IBill extends IDraftBill {
  id: string;
  items?: IBillItem[];
}

export const NBKVenue = 'Venue';
export const NBKType = 'Type';
export const NBKEffectDate = 'Effect Date';
export const NBKPrice = 'Price';
export const NBKPayDate = 'Pay Date';
export const NBKNote = 'Note';

export interface INotionBill {
  Venue: string;
  Type: string;
  'Effect Date'?: string;
  Price: number;
  'Pay Date': string;
  Note: string;
}

export type TNotionBillKey =
  | typeof NBKVenue
  | typeof NBKType
  | typeof NBKEffectDate
  | typeof NBKPrice
  | typeof NBKPayDate
  | typeof NBKNote;
