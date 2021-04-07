import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ChipsAutocompleteComponent } from './components/chips-autocomplete/chips-autocomplete.component';
import { FileInputComponent } from './components/file-input/file-input.component';
import { StatefulViewDirective } from './components/stateful/stateful-view.directive';

@NgModule({
  declarations: [
    FileInputComponent,
    StatefulViewDirective,
    ChipsAutocompleteComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatIconModule,
  ],
  exports: [
    FileInputComponent,
    StatefulViewDirective,
    ChipsAutocompleteComponent,
  ],
})
export class SharedModule { }
