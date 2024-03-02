import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/service/cart.service';
import { Observable, take } from 'rxjs';
import { Cart } from '../cart/model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Products } from '../products/models';
import { BuyService } from './service/buy.service';
import { NotifierService } from 'src/app/core/service/notifier.service';
import { Address } from 'src/app/auth/models';
import { SalesService } from '../sales/service/sales.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent implements OnInit {
  cartToBuy$!: Observable<Cart>
  userId!: string | undefined
  totalPrice: number = 0;
  total: any
  message = ''
  addresses!: Observable<Array<Address>>
  shippingAddress!: Address
  constructor(
    private cartService: CartService,
    private router: Router,
    private authService: AuthService,
    private buyService: BuyService,
    private NotifierService: NotifierService,
    private salesService: SalesService
  ) {
    this.cartToBuy$ = this.cartService.setProductsToBuys$

    this.cartToBuy$.pipe(take(1)).subscribe({
      next: (data) => {
        if (!data.products) {
          this.router.navigate(['dashboard/profile/cart'])
        }else{

          this.totalPrice = data.products.reduce((total, product) => total + product.product.price, 0)
        }
      }
    })

    

    this.authService.user$.subscribe(
      data => {
        this.userId = data?.id
      }
    )
  }
  ngOnInit(): void {
    this.addresses = this.authService.getAddresses()
  }

  buy(product: any) {
    const productInfo = [{ productId: product.product._id, quantity: product.quantity }]

     this.buyService.createBuy(productInfo, this.totalPrice, this.userId as string, this.shippingAddress);
     this.cartToBuy$.pipe(take(1)).subscribe(data => {
       this.cartService.deleteProductFromCart(data._id, product.product._id);
     });
    this.salesService.createSale(product.product.sellerId, this.userId as string , productInfo,this.totalPrice, this.shippingAddress)
    this.message = this.NotifierService.buy();
  }

  buyCart() {
    this.cartToBuy$.pipe(take(1)).subscribe(data => {
      const products = data.products.map(product => ({ productId: product.product._id, quantity: product.quantity }));
      console.log(products);

      this.buyService.createBuy(products, this.totalPrice, this.userId as string, this.shippingAddress);
      data.products.forEach(product => {
        this.salesService.createSale(product.product.sellerId, this.userId as string, products,product.product.price,this.shippingAddress)
      })
      this.message = this.NotifierService.cartBuy();
      this.cartService.clearCartDb(data._id);
    });
  }


  clearMessage() {
    this.message = ''
    this.NotifierService.clearMessage()
    this.router.navigate(['/dashboard/buys'])
  }

  setAddress(address: Address) {
    this.shippingAddress = address
  }
}
