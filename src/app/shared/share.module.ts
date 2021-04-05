import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ChipsAutocompleteComponent } from './components/chips-autocomplete/chips-autocomplete.component';
import { FileInputComponent } from './components/file-input/file-input.component';
import { ButtonLoadingComponent } from './components/stateful/stateful-button/stateful-button-loading/loading.component';
import { StatefulDirective } from './components/stateful/stateful.directive';
import { StatefulViewDirective } from './components/stateful/stateful-view.directive';

@NgModule({
  declarations: [
    FileInputComponent,
    StatefulDirective,
    ButtonLoadingComponent,
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
    StatefulDirective,
    ButtonLoadingComponent,
    StatefulViewDirective,
    ChipsAutocompleteComponent,
  ],
})
export class SharedModule {}
