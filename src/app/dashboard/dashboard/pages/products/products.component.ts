import { Component, OnInit } from '@angular/core';
import { Observable, Subject, Subscription, defaultIfEmpty, map, of, switchMap, take } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Products } from './models';
import { ProductsService } from './service/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})


export class ProductsComponent implements OnInit {
 
  products$: Observable<Products[] | null>
  priceInput: any 
  active!:string

  isLoading:Observable<boolean>
  
  constructor(private productService:ProductsService) {
    this.productService.loadProducts()
    this.products$ = productService.getProducts()
    this.isLoading = this.productService.loader
    
  }
  ngOnInit(): void {
   
  }
  menorPrecio(){
    this.active = '-'
    this.products$.pipe(take(1)).subscribe(
      (data)=>{
        data?.sort((a,b)=> a.price - b.price)
      }
    )
  }
  mayorPrecio(){
    this.active = '+'
    this.products$.pipe(take(1)).subscribe(
      DATA =>{
        DATA?.sort((a,b)=> b.price - a.price)
      }
    )
  }
  filterByPrice() {
    this.active = ''
    this.products$=this.productService.getProducts()
    this.products$.pipe(take(1)).subscribe(
      (data)=>{
        this.products$ = of(data!.filter(p => p.price > this.priceInput));
      }
    )
   
  }
  limpiarFiltros(){
    this.products$ = this.productService.getProducts()
  }
}
