import { Component, OnInit } from '@angular/core';
import { BillAppNotionService } from '../../data/bill-app-notion.service';
import * as billParser from '../../utils/parser';
import { BillImportService } from './bill-import.service';

@Component({
  selector: 'bgt-bill-import',
  templateUrl: './bill-import.component.html',
  styleUrls: ['./bill-import.component.scss'],
  providers: [BillImportService],
})
export class BillImportComponent implements OnInit {
  constructor(
    private billAppNotionService: BillAppNotionService,
    public billImportService: BillImportService
  ) {}

  ngOnInit(): void {}

  billFileChange(file: File | null): void {
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileReader = e.target as FileReader;
      const bills = this.billAppNotionService.parseBillFile(fileReader.result as string);
      this.billImportService.importedBills$.next(bills);
      console.log(`[bill-home] import bills`, bills);
    };
    reader.readAsText(file);
  }
}
