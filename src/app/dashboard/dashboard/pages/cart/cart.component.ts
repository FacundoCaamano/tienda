import { Component } from '@angular/core';
import { CartService } from './service/cart.service';
import { Cart } from './model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  cart$!: Observable<Cart>
  constructor(private cartService:CartService){
    this.cart$ = this.cartService.getCart()
  }
}
