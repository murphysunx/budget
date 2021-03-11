import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'bgt-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss'],
})
export class FileInputComponent implements OnInit {
  private f: File | null = null;
  @ViewChild('fileInput', { static: true }) fileInput?: ElementRef;

  @Input() disabled = false;
  @Input() btnName = 'Import';

  @Output() fileChange = new EventEmitter<File | null>();

  set file(f: File | null) {
    this.f = f;
  }

  get file(): File | null {
    return this.f;
  }

  constructor() {}

  ngOnInit(): void {}

  selectFile(): void {
    if (!this.fileInput) {
      return;
    }
    this.fileInput.nativeElement.click();
  }

  fileChanged(e: Event): void {
    const files = (e.target as HTMLInputElement).files;
    if (!files?.length) {
      this.file = null;
    } else {
      this.file = files.item(0);
    }
    this.fileChange.emit(this.file);
  }
}
