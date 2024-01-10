import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/pages/home/home.component';
import { ProductsComponent } from './dashboard/pages/products/products.component';
import { ProfileComponent } from './dashboard/pages/profile/profile.component';
import { authGuard } from '../core/guards/auth.guard';



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
      }
    ]
  )],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
