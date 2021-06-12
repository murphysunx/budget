import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IProduct } from '../types/product';
import { filter } from 'underscore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products$ = new BehaviorSubject<IProduct[]>([]);

  constructor() {
    this.products$.next([
      {
        id: `0`,
        code: `HB-100-50`,
        name: `手提袋`,
        category: `handbag`,
        quantity: 10,
        unit: `pack`,
        packSize: `100*50`,
        whseId: `0`
      },
      {
        id: `1`,
        code: `HB-100-60`,
        name: `手提袋`,
        category: `handbag`,
        quantity: 50,
        unit: `pack`,
        packSize: `100*60`,
        whseId: `0`
      },
      {
        id: `2`,
        code: `HB-100-60`,
        name: `手提袋`,
        category: `handbag`,
        quantity: 50,
        unit: `pack`,
        packSize: `100*60`,
        whseId: `1`
      },
      {
        id: `3`,
        code: `HB-100-60`,
        name: `手提袋`,
        category: `handbag`,
        quantity: 50,
        unit: `pack`,
        packSize: `100*60`,
        whseId: `1`
      },
    ]);
  }

  getProductsInWhse(whseId: string): Observable<IProduct[]> {
    return this.products$.asObservable().pipe(
      map(products => filter(products, prod => prod.whseId === whseId))
    );
  }

  updateProduct(product: IProduct): void {
    // TODO
    this.nativeUpdate(product);
  }

  private nativeUpdate(product: IProduct): void {
    const products = filter(this.products$.value, p => p.id !== product.id);
    products.push(product);
    this.products$.next(products);
  }
}
