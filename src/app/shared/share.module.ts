import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileInputComponent } from './components/file-input/file-input.component';

@NgModule({
  declarations: [FileInputComponent],
  imports: [CommonModule],
  exports: [FileInputComponent],
})
export class SharedModule {}
