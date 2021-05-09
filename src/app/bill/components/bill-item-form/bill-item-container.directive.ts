import {
  ComponentFactoryResolver,
  Directive,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { IBillItemDraft } from '@bill/types/bill-item';
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

  addBillItemComponent(item?: IBillItemDraft): BillItemFormComponent {
    const billItem = this.componentFactoryResolver.resolveComponentFactory(
      BillItemFormComponent
    );
    const comp = this.viewContainerRef.createComponent(billItem);
    // this.add.emit(comp.instance);
    if (!!item) {
      comp.instance.loadBillItem(item);
    }
    return comp.instance;
  }

  cleanBillItems(): void {
    this.viewContainerRef.clear();
  }
}
