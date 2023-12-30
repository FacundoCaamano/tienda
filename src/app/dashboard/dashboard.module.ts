import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './dashboard/components/footer/footer.component';
import { NavbarComponent } from './dashboard/components/navbar/navbar.component';


@NgModule({
  declarations: [
    DashboardComponent,
    FooterComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
