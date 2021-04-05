import {
  ComponentFactoryResolver,
  Directive,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { BillItemFormComponent } from './bill-item-form.component';

@Directive({
  selector: '[bgtBillItemContainer]',
})
export class BillItemContainerDirective implements OnInit {
  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {}

  addBillItemComponent(): BillItemFormComponent {
    const billItem = this.componentFactoryResolver.resolveComponentFactory(
      BillItemFormComponent
    );
    const comp = this.viewContainerRef.createComponent(billItem);
    // this.add.emit(comp.instance);
    return comp.instance;
  }

  cleanBillItems(): void {
    this.viewContainerRef.clear();
  }
}
