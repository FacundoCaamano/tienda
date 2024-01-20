import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cart } from '../model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  url = environment.api

  private _cart$ = new BehaviorSubject<Cart>({} as Cart)
  public cart$ = this._cart$.asObservable()

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
      }
    })
  }

  getCart(){
    return this.cart$
  }
}
