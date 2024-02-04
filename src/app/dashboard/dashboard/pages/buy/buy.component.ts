import { Component } from '@angular/core';
import { CartService } from '../cart/service/cart.service';
import { Observable, take } from 'rxjs';
import { Cart } from '../cart/model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Products } from '../products/models';
import { BuyService } from './service/buy.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent {
  cartToBuy$!:Observable<Cart>
  userId!: string | undefined
  constructor(
    private cartService:CartService,
    private router:Router,
    private authService:AuthService,
    private buyService:BuyService
    ){
    this.cartToBuy$ = this.cartService.setProductsToBuys$
    
    this.cartToBuy$.pipe(take(1)).subscribe({
      next:(data)=>{
        if(!data.products){
          this.router.navigate(['dashboard/profile/cart'])
        }
      }
    })

    this.authService.user$.subscribe(
      data =>{
        this.userId = data?.id
      }
    )
    
    
  }

  buy(products:any, quantity:number){
    
    console.log(products.product._id, quantity);
    
  this.buyService.createBuy(products.product._id, quantity, this.userId as string)
    
    
  }
}
