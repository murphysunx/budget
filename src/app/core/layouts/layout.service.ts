import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  isSideNavOpen$ = new BehaviorSubject<boolean>(false);

  constructor() {}

  toggleSideNav(): void {
    this.isSideNavOpen$.next(!this.isSideNavOpen$.value);
  }
}
