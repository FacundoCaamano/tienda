import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Buy } from '../models';
import { Products } from '../../products/models';

@Injectable({
  providedIn: 'root'
})
export class BuyService {

  url = environment.api

  private _buys$ = new BehaviorSubject<Array<Buy>>([])
  public buys$ = this._buys$.asObservable()

  constructor(private http:HttpClient) { }

  createBuy(products:any,total:number,userId:string, ){
    this.http.post<Buy>(this.url + '/buys/createbuy',{ products, total, userId})
    .subscribe({
      next: (response) => {
        // Manejo de la respuesta aquí
        console.log('Respuesta exitosa:', response);
      },
      error: (error) => {
        // Manejo de errores aquí
        console.error('Error en la suscripción:', error);
      },
      complete: () => {
        console.log('Suscripción completada');
      }
    })
  }
}
