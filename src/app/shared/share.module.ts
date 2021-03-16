import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FileInputComponent } from './components/file-input/file-input.component';
import { StatefulDirective } from './components/stateful/stateful.directive';
import { ButtonLoadingComponent } from './components/stateful/stateful-button/stateful-button-loading/loading.component';
import { ViewHolderDirective } from './components/stateful/view-holder.directive';

@NgModule({
  declarations: [
    FileInputComponent,
    StatefulDirective,
    ButtonLoadingComponent,
    ViewHolderDirective,
  ],
  imports: [CommonModule],
  exports: [
    FileInputComponent,
    StatefulDirective,
    ButtonLoadingComponent,
    ViewHolderDirective,
  ],
})
export class SharedModule {}
