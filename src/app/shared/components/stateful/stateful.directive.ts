import {
  ComponentFactoryResolver,
  Directive,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { has } from 'underscore';
import { EStatefulButtonState } from './stateful-button/stateful-button.state';

@Directive({
  selector: '[stateful]',
})
export class StatefulDirective implements OnInit, OnDestroy {
  private destroy$ = new Subject();

  // @Input() stateType!: Type<any>;
  @Input() state$?: Observable<any>;
  @Input() effects!: {
    [key: string]: (() => void) | undefined;
  };

  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private renderer2: Renderer2
  ) {}

  ngOnInit(): void {
    if (this.state$) {
      this.state$.pipe(takeUntil(this.destroy$)).subscribe((state) => {
        console.log(`[stateful] state change`, state, this.viewContainerRef);
        if (!!this.effects && has(this.effects, state.toString())) {
          const effect = this.effects[state];
          if (!!effect) {
            effect();
          }
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
