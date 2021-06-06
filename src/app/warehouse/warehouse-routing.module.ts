import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WarehouseCenterComponent } from './warehouse-center/warehouse-center.component';
import { WarehouseDetailComponent } from './warehouse-detail/warehouse-detail.component';

const routes: Routes = [
  {
    path: ``,
    redirectTo: `warehouses`,
    pathMatch: `full`
  },
  {
    path: `warehouses`,
    component: WarehouseCenterComponent,
  },
  {
    path: `warehouses/:id`,
    component: WarehouseDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseRoutingModule { }
