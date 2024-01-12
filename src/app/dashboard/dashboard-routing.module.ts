import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/pages/home/home.component';
import { ProductsComponent } from './dashboard/pages/products/products.component';
import { ProfileComponent } from './dashboard/pages/profile/profile.component';
import { authGuard } from '../core/guards/auth.guard';
import { BuysComponent } from './dashboard/pages/profile/components/buys/buys.component';



@NgModule({
  imports: [RouterModule.forChild(
    [
      {
        path:'home',
        component:HomeComponent
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'profile',
        canActivate: [authGuard],
        component: ProfileComponent
      },
      {
        path: 'profile/buys',
        component: BuysComponent
      }
    ]
  )],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
