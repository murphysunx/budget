import { Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { has } from 'underscore';
import { EStatefulButtonState } from './stateful-button/stateful-button.state';

@Directive({
  selector: '[stateful]',
})
export class StatefulDirective implements OnInit, OnDestroy {
  private destory$ = new Subject();

  @Input('state') state$?: Observable<EStatefulButtonState>;
  @Input('effects') effects?: {
    [key: string]: () => void;
  };

  constructor() {}

  ngOnInit(): void {
    if (this.state$) {
      this.state$.pipe(takeUntil(this.destory$)).subscribe((state) => {
        if (!!this.effects && has(this.effects, state.toString())) {
          const effect = this.effects[state];
          effect();
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }
}
