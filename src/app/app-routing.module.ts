import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: `bill`,
    loadChildren: () => import('./bill/bill.module').then((m) => m.BillModule),
  },
  {
    path: `whse`,
    loadChildren: () => import('./warehouse/warehouse.module').then(m => m.WarehouseModule),
  },
  {
    path: `whse`,
    loadChildren: () => import('./warehouse/warehouse-sidebar/warehouse-sidebar.module').then(m => m.WarehouseSidebarModule),
    outlet: `sidebar`
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
