import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './dashboard/components/footer/footer.component';
import { NavbarComponent } from './dashboard/components/navbar/navbar.component';
import { HomeComponent } from './dashboard/pages/home/home.component';
import { ProductsComponent } from './dashboard/pages/products/products.component';
import { ProfileComponent } from './dashboard/pages/profile/profile.component';
import { BuysComponent } from './dashboard/pages/profile/components/buys/buys.component';
import { EditComponent } from './dashboard/pages/profile/components/edit/edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductDetailComponent } from './dashboard/pages/products/product-detail/product-detail.component';
import { CartComponent } from './dashboard/pages/cart/cart.component';
import { CartBadgeComponent } from './dashboard/components/cart-badge/cart-badge.component';


@NgModule({
  declarations: [
    DashboardComponent,
    FooterComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    ProfileComponent,
    BuysComponent,
    EditComponent,
    ProductDetailComponent,
    CartComponent,
    CartBadgeComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DashboardModule { }
