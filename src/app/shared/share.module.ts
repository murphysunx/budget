import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FileInputComponent } from './components/file-input/file-input.component';
import { StatefulDirective } from './components/stateful/stateful.directive';
import { ButtonLoadingComponent } from './components/stateful/stateful-button/stateful-button-loading/loading.component';

@NgModule({
  declarations: [FileInputComponent, StatefulDirective, ButtonLoadingComponent],
  imports: [CommonModule],
  exports: [FileInputComponent, StatefulDirective, ButtonLoadingComponent],
})
export class SharedModule {}
