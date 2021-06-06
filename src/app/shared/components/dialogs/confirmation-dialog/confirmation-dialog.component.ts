import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IGeneralDialogData } from '../general-dialog/general-dialog.component';

@Component({
  selector: 'bgt-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  title: string | undefined;
  content: string | undefined;

  constructor(
    private dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: IGeneralDialogData) { }

  ngOnInit(): void {
    const { title, content } = this.data;
    this.title = title;
    this.content = content;
  }

}
