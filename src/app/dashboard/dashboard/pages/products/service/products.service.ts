import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Products } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  url = 'http://localhost:3000/carrito-pro'

  private _products$ = new BehaviorSubject<Products[] | null>([])
  public products$ = this._products$.asObservable()
  constructor(private http:HttpClient) {

   }

   loadProducts(){
     this.http.get<Products[]>(this.url + '/products').subscribe({
      next: (data)=>{
        this._products$.next(data)
      }
     })
   }

   getProducts(){
    return this.products$
   }
}
