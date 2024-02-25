import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Buy } from '../models';
import { Products } from '../../products/models';
import { Address } from 'src/app/auth/models';

@Injectable({
  providedIn: 'root'
})
export class BuyService {

  url = environment.api

  private _buys$ = new BehaviorSubject<Array<Buy>>([])
  public buys$ = this._buys$.asObservable()

  constructor(private http:HttpClient) { }

  createBuy(products:any,total:number,userId:string, address:Address ){
    this.http.post<Buy>(this.url + '/buys/createbuy',{ products, total, userId, address })
    .subscribe({
      next: (response) => {
        // Manejo de la respuesta aquí
      },
      error: (error) => {
        // Manejo de errores aquí
      },
      complete: () => {
      }
    })
  }


}
