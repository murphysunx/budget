export interface IBillItem {
  id: string;
  name?: string;
  price?: number;
  categories: string[];
  qty?: number;
  cost: number;
  note?: string;
}

export interface IBill extends IBillItem {
  payer?: any;
  payee?: any;
  venue?: any;
  effectDate: string;
  payDate: string;
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
