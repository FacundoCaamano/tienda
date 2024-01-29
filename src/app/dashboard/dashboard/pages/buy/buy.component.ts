import { Component } from '@angular/core';
import { CartService } from '../cart/service/cart.service';
import { Observable, take } from 'rxjs';
import { Cart } from '../cart/model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent {
  cartToBuy$!:Observable<Cart>
  constructor(private cartService:CartService, private router:Router){
    this.cartToBuy$ = this.cartService.setProductsToBuys$
    
    this.cartToBuy$.pipe(take(1)).subscribe({
      next:(data)=>{
        if(!data.products){
          this.router.navigate(['dashboard/profile/cart'])
        }
      }
    })
    
    
  }
}
