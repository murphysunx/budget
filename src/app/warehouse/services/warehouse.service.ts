import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IWarehouse } from '../interfaces/warehouse';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  warehouses$ = new BehaviorSubject<IWarehouse[]>([]);

  constructor() {
    this.warehouses$.next([
      {
        id: '0',
        name: `朝天门`,
        location: ``
      },
      {
        id: '1',
        name: `服装城`,
        location: ``
      }
    ]);
  }

  get warehouses(): IWarehouse[] {
    return this.warehouses$.value;
  }

  createWarehouse(name: string, location: string): IWarehouse {
    const whse: IWarehouse = {
      id: this.warehouses.length.toString(),
      name,
      location
    };
    return whse;
  }

  private addWarehouse(whse: IWarehouse): void {
    const warehouses = this.warehouses;
    this.warehouses$.next([...warehouses, whse]);
  }

  createAndSaveWarehouse(name: string, location: string): IWarehouse {
    const whse = this.createWarehouse(name, location);
    this.addWarehouse(whse);
    return whse;
  }
}
