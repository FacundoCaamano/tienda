import { Component } from '@angular/core';
import { Observable, defaultIfEmpty, map, of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Products } from './models';
import { ProductsService } from './service/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})


export class ProductsComponent {
 
  products$: Observable<Products[] | null>
  priceInput: any 
  constructor(private productService:ProductsService) {
    this.productService.loadProducts()
    this.products$ = productService.getProducts()
    
    
  }
  menorPrecio(){
    this.products$.subscribe(
      (data)=>{
        data?.sort((a,b)=> a.price - b.price)
      }
    )
  }
  mayorPrecio(){
    this.products$.subscribe(
      DATA =>{
        DATA?.sort((a,b)=> b.price - a.price)
      }
    )
  }
  filterByPrice() {
    this.products$.subscribe(
      (data)=>{
        this.products$ = of(data!.filter(p => p.price > this.priceInput));
      }
    )
   
  }
}
