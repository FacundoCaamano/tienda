import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { Products } from '../models';
import { Observable, Subscription, take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
import { CartService } from '../../cart/service/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  product: Observable<Products>
  productId:string = ''

  selectedImage!:string 

  cart:any

  quantity:number = 1

  user:any

  isLoading!:Observable<boolean>

  private suscription!: Subscription

  constructor(
    private produductService:ProductsService,
    private activatedRoute:ActivatedRoute, 
    private authService:AuthService,
    private cartService:CartService
    ) {
    this.isLoading = this.cartService.loader
    this.productId = this.activatedRoute.snapshot.params['id']
    this.product = this.produductService.getProductId(this.productId)
    this.authService.user$.pipe(take(1)).subscribe( user =>{
    this.cart = user?.cart

    this.authService.user$.pipe(take(1)).subscribe(
      data =>{
        if(data){
          this.user = true
        }
        else{
          this.user = false
        }
      }
    )    
   })
  }
  ngOnInit(): void {
    this.suscription = this.product.subscribe((product) => {
      if (product && product.thumbnail && product.thumbnail.length > 0) {
        this.selectedImage = product.thumbnail[0];
      }
    });
  }
  showImage(image:string){
    this.selectedImage = image
  }
  ngOnDestroy(): void {
    this.suscription.unsubscribe()   
  }

  addToCart(productId:string){
    this.cartService.loader.next(true)
    this.cartService.addProductToCart(productId, this.cart, this.quantity)
  }

  increaseQuantity(){
    this.quantity ++
  }
  decreaseQuantity(){
    this.quantity --
  }

  
}
