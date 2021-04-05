import {
  ComponentFactoryResolver,
  Directive,
  Input,
  OnDestroy,
  OnInit,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { has } from 'underscore';

@Directive({
  selector: '[statefulView]',
})
export class StatefulViewDirective implements OnInit, OnDestroy {
  private destroy$ = new Subject();

  @Input() state$?: Observable<any>;
  @Input() componentsConfig?: {
    [key: string]: Type<any> | undefined;
  };
  @Input() effects!: {
    [key: string]: (() => void) | undefined;
  };

  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {
    this.state$?.pipe(takeUntil(this.destroy$)).subscribe((state) => {
      this.viewContainerRef.clear();
      if (
        !!this.componentsConfig &&
        has(this.componentsConfig, state.toString())
      ) {
        const compType = this.componentsConfig[state];
        if (!!compType) {
          const component = this.componentFactoryResolver.resolveComponentFactory(
            compType
          );
          this.viewContainerRef.createComponent(component);
        }
      }
      this.runStateChangeEffects(state);
    });
  }

  private runStateChangeEffects(state: string): void {
    if (!!this.effects && has(this.effects, state.toString())) {
      const effect = this.effects[state];
      if (!!effect) {
        effect();
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
