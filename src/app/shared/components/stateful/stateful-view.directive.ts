import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnDestroy,
  OnInit,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { has, each, pairs } from 'underscore';
import { IStateful } from './stateful';

@Directive({
  selector: '[statefulView]',
})
export class StatefulViewDirective implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  private cmpRef: ComponentRef<any> | undefined;

  @Input() state$?: Observable<IStateful<any>>;
  @Input() componentsConfig?: {
    [key: string]: Type<any> | undefined;
  };
  @Input() effects!: {
    [key: string]: (() => void) | undefined;
  };

  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
    this.state$?.pipe(takeUntil(this.destroy$)).subscribe((stateful) => {
      const { state, attrs } = stateful;
      this.viewContainerRef.clear();
      if (
        !!this.componentsConfig &&
        has(this.componentsConfig, state.toString())
      ) {
        const compType = this.componentsConfig[state];
        if (!!compType) {
          const facotry = this.componentFactoryResolver.resolveComponentFactory(
            compType
          );
          this.cmpRef = this.viewContainerRef.createComponent(facotry);
          if (!!attrs) {
            this.setupAttrs(this.cmpRef.instance, attrs);
          }
        }
      }
      this.runStateChangeEffects(state);
    });
  }

  private setupAttrs(component: any, attrs: { [key: string]: any }): void {
    const pairList = pairs(attrs);
    if (pairList.length === 0) {
      return;
    }
    each(pairList, ([key, val]) => {
      component[key] = val;
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
