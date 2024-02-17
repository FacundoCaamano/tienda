import { Component } from '@angular/core';
import { CartService } from '../cart/service/cart.service';
import { Observable, take } from 'rxjs';
import { Cart } from '../cart/model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Products } from '../products/models';
import { BuyService } from './service/buy.service';
import { NotifierService } from 'src/app/core/service/notifier.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent {
  cartToBuy$!: Observable<Cart>
  userId!: string | undefined
  totalPrice: number = 0; 
  message = ''
  constructor(
    private cartService: CartService,
    private router: Router,
    private authService: AuthService,
    private buyService: BuyService,
    private NotifierService:NotifierService
  ) {
    this.cartToBuy$ = this.cartService.setProductsToBuys$

    this.cartToBuy$.pipe(take(1)).subscribe({
      next: (data) => {
        if (!data.products) {
          this.router.navigate(['dashboard/profile/cart'])
        }
      }
    })

    this.cartToBuy$.pipe(take(1)).subscribe({
      next : data =>{
        this.totalPrice = data.products.reduce((total, product) => total + product.product.price, 0)
      }
    })

    this.authService.user$.subscribe(
      data => {
        this.userId = data?.id
      }
    )
  }

  buy(products: any, quantity: number) {
    this.buyService.createBuy(products.product._id, quantity, this.userId as string)
    this.message =  this.NotifierService.buy()
  }

  buyCart(){
    let dataCart 
    this.cartToBuy$.subscribe(
      data =>{
        dataCart = data 
        const productIds = dataCart.products.map(product => product.product._id);
        this.buyService.createBuy(productIds, this.totalPrice ,this.userId as string)
        this.message = this.NotifierService.cartBuy()
      }
      )
      
    }

  clearMessage(){
    this.message = ''
    this.NotifierService.clearMessage()
  }
}
