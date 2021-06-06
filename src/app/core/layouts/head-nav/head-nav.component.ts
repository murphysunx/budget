import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'bgt-head-nav',
  templateUrl: './head-nav.component.html',
  styleUrls: ['./head-nav.component.scss'],
})
export class HeadNavComponent implements OnInit {
  constructor(private layoutService: LayoutService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void { }

  toggleSideBar(): void {
    this.layoutService.toggleSideNav();
  }

  navigate(path: string): void {
    this.router.navigate([{ outlets: { primary: path, sidebar: path } }],
      { relativeTo: this.route });
  }
}
