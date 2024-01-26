import { Component, OnDestroy } from '@angular/core';
import { CartService } from './service/cart.service';
import { Cart } from './model';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnDestroy {
  cart$!: Observable<Cart>
  cartId!:string
  subscription!: Subscription
  constructor(private cartService:CartService){
    this.cart$ = this.cartService.getCart()
    this.subscription = this.cartService.cart$.subscribe(cart =>{
      this.cartId = cart._id
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
  deleteProduct(productId:string){
    this.cartService.deleteProductFromCart( this.cartId,productId)
  }
}
