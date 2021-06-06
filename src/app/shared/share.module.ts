import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ChipsAutocompleteComponent } from './components/chips-autocomplete/chips-autocomplete.component';
import { ConfirmationDialogComponent } from './components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { GeneralDialogComponent } from './components/dialogs/general-dialog/general-dialog.component';
import { FileInputComponent } from './components/file-input/file-input.component';
import { GeneralNotifierComponent } from './components/notifications/general-notifier/general-notifier.component';
import { NotifierService } from './components/notifications/notifier.service';
import { StatefulViewDirective } from './components/stateful/stateful-view.directive';

@NgModule({
  declarations: [
    FileInputComponent,
    StatefulViewDirective,
    ChipsAutocompleteComponent,
    GeneralDialogComponent,
    ConfirmationDialogComponent,
    GeneralNotifierComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  exports: [
    FileInputComponent,
    StatefulViewDirective,
    ChipsAutocompleteComponent,
  ],
  providers: [NotifierService]
})
export class SharedModule { }
