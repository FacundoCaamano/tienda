import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, map, mergeMap, take } from 'rxjs';
import { CreateProduct, Products } from '../models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  url = environment.api

  private _products$ = new BehaviorSubject<Products[]>([])
  public products$ = this._products$.asObservable()
  public loader = new BehaviorSubject<boolean>(true)
  
  constructor(private http:HttpClient) {

   }

   loadProducts(){
     this.http.get<Products[]>(this.url + '/products').subscribe({
      next: (data)=>{
        this._products$.next(data)
        this.loader.next(false)
      }
    })
   }

   getProducts(){
    return this.products$
   }

   getProductId(id:string){
   
    return this.http.get<Products>(this.url + '/products/' + id )
   }

   postProduct(product:CreateProduct):void{
    this.http.post<Products>(this.url + '/products', product)
    .pipe(
      mergeMap((productCreaTE) => this.products$.pipe(
        take(1),
        map((arrayActual)=> [...arrayActual, productCreaTE])
      ))
    ).subscribe({
      next:(arrayActualizado) =>{
        this._products$.next(arrayActualizado)
      }
    })
   }  
}
