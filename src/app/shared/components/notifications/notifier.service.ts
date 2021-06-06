import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef } from '@angular/material/snack-bar';
import { GeneralNotifierComponent } from './general-notifier/general-notifier.component';

@Injectable()
export class NotifierService {

  constructor(private snackBar: MatSnackBar) {

  }

  open(config?: MatSnackBarConfig<{ message: string, action?: string }>): MatSnackBarRef<GeneralNotifierComponent> {
    return this.snackBar.openFromComponent(GeneralNotifierComponent, config);
  }
}
