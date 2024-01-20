import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { Products } from '../models';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  product: Observable<Products>
  productId:string = ''
  selectedImage!:string 
  private suscription!: Subscription

  constructor(private produductService:ProductsService, private router:Router, private activatedRoute:ActivatedRoute) {
   this.productId = this.activatedRoute.snapshot.params['id']
   this.product = this.produductService.getProductId(this.productId)
   
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
}