import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cart } from '../model';
import { Products } from '../../products/models';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  url = environment.api

  private _cart$ = new BehaviorSubject<Cart>({} as Cart)
  public cart$ = this._cart$.asObservable()

  private _productsInCart$ = new BehaviorSubject<number>(0)
  public  productsInCart$ = this._productsInCart$.asObservable()

  private _setProductsToBuy$ = new BehaviorSubject<any>([])
  public  setProductsToBuys$ = this._setProductsToBuy$.asObservable()

  constructor(private http:HttpClient) { }

  loadCart(id:string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')!
      })
    }
    this.http.get<Cart>(this.url + '/carts/' + id ).subscribe({
      next:(data)=>{
        this._cart$.next(data)
        this._productsInCart$.next(data.products.length)
      }
    })
  }

  getCart(){
    return this.cart$
  }

  addProductToCart(productId:string, cartId:string, quantity:number){
    this.http.post(this.url + '/carts/' + cartId + '/product/' + productId , {quantity}).subscribe({
      next:(data)=>{
        this.loadCart(cartId)
      }
    })
    console.log('desde el servicio', productId, cartId);
    
  }

  deleteProductFromCart( cartId:string,productId:string){
    this.http.delete(this.url + '/carts/' + cartId + '/product/' + productId).subscribe({
      next:(data)=>{
        this.loadCart(cartId)
      }
    })
  }

  setBuy(products:Observable<any>){
    products.subscribe(
      {
        next: data =>{
          this._setProductsToBuy$.next(data)
          console.log(data);
          
        }
      }
    )
    
  }
 
}
