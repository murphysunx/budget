import { IBillItem } from './bill-item';
import { reduce } from 'underscore';

export interface IDraftBill {
  payer?: any;
  payee?: any;
  venue?: any;
  effectStartDate?: string;
  effectEndDate?: string;
  payDate: string;
  items?: IBillItem[];
  note?: string;
  cost?: number;
}

export class Bill {
  public readonly id: string;
  public payer: any;
  public payee: any;
  public venue: any;
  public effectStartDate: string | undefined;
  public effectEndDate: string | undefined;
  public payDate: string;
  public items: IBillItem[] | undefined;
  public note: string | undefined;
  public cost: number | undefined;

  constructor(id: string, draft: IDraftBill) {
    this.id = id;
    this.payer = draft.payer;
    this.payee = draft.payee;
    this.venue = draft.venue;
    this.effectStartDate = draft.effectStartDate;
    this.payDate = draft.payDate;
    this.items = draft.items;
    this.note = draft.note;
    this.cost = draft.cost;
  }

  get total(): number {
    if (!!this.items) {
      return reduce(this.items, (prev, curr) => prev + curr.cost, 0);
    }
    if (!!this.cost) {
      return this.cost;
    }
    throw new Error('no cost');
  }
}

export interface IBill extends IDraftBill {
  id: string;
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
