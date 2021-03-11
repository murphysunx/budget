import { Injectable } from '@angular/core';
import * as _ from 'underscore';
import { v4 as uuidv4 } from 'uuid';
import {
  IBill,
  INotionBill,
  NBKEffectDate,
  NBKNote,
  NBKPayDate,
  NBKPrice,
  NBKType,
  NBKVenue,
  TNotionBillKey,
} from '../types/bill';

@Injectable({
  providedIn: 'root',
})
export class BillAppNotionService {
  constructor() {}

  public parseBillFile(results: string): IBill[] {
    // console.log(`[bill-home] read file result`, results);
    const raws = this.parseBillFromNotionCsv(results);
    if (!raws?.length) {
      return [];
    }
    const bills = _.map(raws, (result, idx) => this.parseSingleBill(result));
    return bills;
  }

  private parseSingleBill(obj: INotionBill): IBill {
    const bill: IBill = {
      id: uuidv4(),
      payee: this.extractNotionBillByAttrName(obj, NBKVenue),
      categories: this.splitCategories(
        this.extractNotionBillByAttrName(obj, NBKType)
      ),
      cost: this.extractNotionBillByAttrName(obj, NBKPrice),
      note: this.extractNotionBillByAttrName(obj, NBKNote),
      payDate: this.extractNotionBillByAttrName(obj, NBKPayDate),
      effectDate: this.extractNotionBillByAttrName(obj, NBKEffectDate),
    };
    if (bill.effectDate && !bill.payDate) {
      bill.payDate = bill.effectDate;
    }
    return bill;
  }

  private splitCategories(rawCat: string | undefined): string[] {
    if (!rawCat) {
      return [];
    }
    return rawCat.split(' ');
  }

  private extractNotionBillByAttrName(
    obj: INotionBill,
    key: TNotionBillKey
  ): any {
    return _.has(obj, key) ? obj[key] : undefined;
  }

  // var csv is the CSV file with headers
  private parseBillFromNotionCsv(csv: string): any[] {
    const lines = csv.split('\n');
    const result = [];
    const headers = lines[0].split(',');

    for (let i = 1; i < lines.length; i++) {
      const obj: any = {};
      let line = lines[i];
      const re = new RegExp('(?!(([^"]*"){2})*[^"]*$),');
      line = line.replace(re, '');
      line = line.replace(/"/g, '');
      const currentline = line.split(',');
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j].trim()] = currentline[j];
      }
      result.push(obj);
    }
    return result;
  }
}
