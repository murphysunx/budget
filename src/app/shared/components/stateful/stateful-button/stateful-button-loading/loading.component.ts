import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bgt-btn-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class ButtonLoadingComponent implements OnInit {
  isLoading = false;

  constructor() {}

  ngOnInit(): void {}
}
