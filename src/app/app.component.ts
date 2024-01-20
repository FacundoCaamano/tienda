import { Component } from '@angular/core';
import { AuthService } from './auth/service/auth.service';
import { CartService } from './dashboard/dashboard/pages/cart/service/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'carrito-pro';
  id!:string
  constructor(private authService:AuthService, private cartService:CartService){
    this.authService.checkSession()
    this.authService.user$.subscribe(
      data =>{
        if(data){
          this.id = data.cart
        }
      }
    )
    this.cartService.loadCart(this.id)
  }
}
