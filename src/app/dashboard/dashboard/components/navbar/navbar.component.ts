import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { user, userData } from 'src/app/auth/models';
import { AuthService } from 'src/app/auth/service/auth.service';
import { CartService } from '../../pages/cart/service/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public user$!:Observable<userData | null>
  constructor(private authService:AuthService, private cartService:CartService) {
  }
  ngOnInit(): void {
    this.user$ = this.authService.user$
  }
  logout() {
    this.authService.logout()
    this.cartService.clearCart()
  }
}
