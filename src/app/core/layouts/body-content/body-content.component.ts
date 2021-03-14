import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'bgt-body-content',
  templateUrl: './body-content.component.html',
  styleUrls: ['./body-content.component.scss'],
})
export class BodyContentComponent implements OnInit, OnDestroy {
  private destory$ = new Subject();

  isSideNavOpen$ = this.layoutService.isSideNavOpen$.pipe(
    takeUntil(this.destory$)
  );

  constructor(private layoutService: LayoutService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }
}
