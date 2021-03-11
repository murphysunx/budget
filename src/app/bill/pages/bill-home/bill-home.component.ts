import { Component, OnInit, ViewChild } from '@angular/core';
import { FileInputComponent } from 'src/app/shared/components/file-input/file-input.component';


@Component({
  selector: 'bgt-bill-home',
  templateUrl: './bill-home.component.html',
  styleUrls: ['./bill-home.component.scss'],
})
export class BillHomeComponent implements OnInit {
  @ViewChild('fileInput', { static: true }) fileInput?: FileInputComponent;

  constructor() {}

  ngOnInit(): void {}


}
