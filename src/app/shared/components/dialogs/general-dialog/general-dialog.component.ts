import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface IGeneralDialogData {
  title?: string;
  content?: string;
}

@Component({
  selector: 'bgt-general-dialog',
  templateUrl: './general-dialog.component.html',
  styleUrls: ['./general-dialog.component.scss']
})
export class GeneralDialogComponent implements OnInit {

  title: string | undefined;

  constructor(
    private dialogRef: MatDialogRef<GeneralDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: IGeneralDialogData) { }

  ngOnInit(): void {
    this.title = this.data.title;
  }

  close(): void {
    this.dialogRef.close();
  }
}
