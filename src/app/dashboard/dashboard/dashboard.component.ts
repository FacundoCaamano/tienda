import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';
import { CartService } from './pages/cart/service/cart.service';
import { userData } from 'src/app/auth/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  id!:string
  user!: userData | null
  constructor(private authService:AuthService, private cartService:CartService){
    this.authService.checkSession()
    this.authService.user$.subscribe(
      data => {
        this.user = data
      }
    )
    if(this.user){

      this.authService.user$.subscribe(
        data =>{
          if(data){
            this.id = data.cart
          }
        }
        )
        this.cartService.loadCart(this.id)    
        this.authService.loadAddresses()
      }
    }
    
  }