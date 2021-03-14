import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillHomeComponent } from './pages/bill-home/bill-home.component';
import { BillImportComponent } from './pages/bill-import/bill-import.component';
import { BillNewComponent } from './pages/bill-new/bill-new.component';

const routes: Routes = [
  {
    path: ``,
    redirectTo: `/home`,
    pathMatch: `full`,
  },
  {
    path: `home`,
    component: BillHomeComponent,
  },
  {
    path: `import`,
    component: BillImportComponent,
  },
  {
    path: `new`,
    component: BillNewComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillRoutingModule {}
