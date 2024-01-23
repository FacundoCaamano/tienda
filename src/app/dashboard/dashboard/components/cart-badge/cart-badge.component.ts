import { Component } from '@angular/core';
import { CartService } from '../../pages/cart/service/cart.service';

@Component({
  selector: 'app-cart-badge',
  templateUrl: './cart-badge.component.html',
  styleUrls: ['./cart-badge.component.scss']
})
export class CartBadgeComponent {

  productsInCart!:any
  constructor(private cartService:CartService) {
    this.productsInCart = this.cartService.productsInCart$
  }
}
