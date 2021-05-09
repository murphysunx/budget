export interface IBillItemDraft {
  name: string;
  price?: number;
  categories?: string[];
  qty?: number;
  cost: number;
  note?: string;
}

export interface IBillItem extends IBillItemDraft {
  id: string;
}

export class BillItem {
  public readonly id: string;
  name: string;
  price: number | undefined;
  categories: string[] | undefined;
  qty: number | undefined;
  cost: number;
  note: string | undefined;

  constructor(id: string, item: IBillItemDraft) {
    this.id = id;
    const { name, price, categories, qty, cost, note } = item;
    this.name = name;
    this.price = price;
    this.categories = categories;
    this.qty = qty;
    this.cost = cost;
    this.note = note;
  }
}