import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/pages/home/home.component';
import { ProductsComponent } from './dashboard/pages/products/products.component';
import { ProfileComponent } from './dashboard/pages/profile/profile.component';
import { authGuard } from '../core/guards/auth.guard';
import { BuysComponent } from './dashboard/pages/profile/components/buys/buys.component';
import { EditComponent } from './dashboard/pages/profile/components/edit/edit.component';
import { ProductDetailComponent } from './dashboard/pages/products/product-detail/product-detail.component';
import { CartComponent } from './dashboard/pages/cart/cart.component';
import { BuyComponent } from './dashboard/pages/buy/buy.component';
import { SalesComponent } from './dashboard/pages/sales/sales.component';
import { PostComponent } from './dashboard/pages/post/post.component';
import { AddressComponent } from './dashboard/pages/profile/components/address/address.component';
import { MyProductsComponent } from './dashboard/pages/profile/components/my-products/my-products.component';



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
        path:'products/detail/:id',
        component: ProductDetailComponent
      }
      ,
      {
        path: 'profile',
        canActivate: [authGuard],
        component: ProfileComponent
      },
      {
        path: 'profile/buys',
        canActivate:[authGuard],
        component: BuysComponent
      },
      {
        path: 'profile/cart',
        component: CartComponent
      },
      {
        path: 'profile/sales',
        component: SalesComponent
      },
      {
        path: 'profile/post',
        component: PostComponent
      },
      {
        path: 'profile/address',
        component : AddressComponent
      },
      {
        path: 'profile/my-products',
        component : MyProductsComponent
      },
      {
        
        path: 'buys',
        canActivate:[authGuard],
        component: BuysComponent
      },
      {
        path: '**',
        redirectTo:'home'
      }
    ]
  )],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
