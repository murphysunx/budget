import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillEditComponent } from './pages/bill-edit/bill-edit.component';
import { BillEditResolver } from './pages/bill-edit/bill-edit.resolver';
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
  {
    path: `edit/:id`,
    component: BillEditComponent,
    resolve: {
      bill: BillEditResolver
    }
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillRoutingModule { }
