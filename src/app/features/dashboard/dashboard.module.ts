import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { WrapperComponent } from './wrapper.component';

import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [WrapperComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatBadgeModule,
    MatMenuModule,
    MatButtonModule,
  ],
})
export class DashboardModule {}
