import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

export interface IGeneralNotifierData {
  message?: string;
  action?: string;
}

@Component({
  selector: 'bgt-general-notifier',
  templateUrl: './general-notifier.component.html',
  styleUrls: ['./general-notifier.component.scss']
})
export class GeneralNotifierComponent implements OnInit {
  message: string | undefined;
  action: string | undefined;

  constructor(
    private snackRef: MatSnackBarRef<GeneralNotifierComponent>,
    @Inject(MAT_SNACK_BAR_DATA) private data: IGeneralNotifierData) { }

  ngOnInit(): void {
    const { message, action } = this.data;
    this.message = message;
    this.action = action;
  }

  onAction(): void {
    this.snackRef.dismissWithAction();
  }
}
