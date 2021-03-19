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
export class ViewHolderDirective implements OnInit, OnDestroy {
  private destroy$ = new Subject();

  @Input() state$?: Observable<any>;
  @Input() components?: {
    [key: string]: Type<any> | undefined;
  };

  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {
    this.state$?.pipe(takeUntil(this.destroy$)).subscribe((state) => {
      this.viewContainerRef.clear();
      if (!!this.components && has(this.components, state.toString())) {
        const compType = this.components[state];
        if (!!compType) {
          const component = this.componentFactoryResolver.resolveComponentFactory(
            compType
          );
          this.viewContainerRef.createComponent(component);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
