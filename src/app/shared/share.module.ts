import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FileInputComponent } from './components/file-input/file-input.component';

@NgModule({
  declarations: [FileInputComponent],
  imports: [CommonModule],
  exports: [FileInputComponent],
})
export class SharedModule {}
