import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'bgt-head-nav',
  templateUrl: './head-nav.component.html',
  styleUrls: ['./head-nav.component.scss'],
})
export class HeadNavComponent implements OnInit {
  constructor(private layoutService: LayoutService) {}

  ngOnInit(): void {}

  toggleSideBar(): void {
    this.layoutService.toggleSideNav();
  }
}
