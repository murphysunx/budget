import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { BodyContentComponent } from './layouts/body-content/body-content.component';
import { HeadNavComponent } from './layouts/head-nav/head-nav.component';
import { SideNavComponent } from './layouts/side-nav/side-nav.component';

@NgModule({
  declarations: [HeadNavComponent, BodyContentComponent, SideNavComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
  ],
  exports: [HeadNavComponent, BodyContentComponent],
})
export class CoreModule {}
