import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Sales } from '../model';
import { Address } from 'src/app/auth/models';


@Injectable({
  providedIn: 'root'
})
export class SalesService {

  private url = environment.api

  private _sales$ = new BehaviorSubject<Array<Sales>>([])
  public sales$ = this._sales$.asObservable()

  constructor(private http:HttpClient) {}

    loadSales(userId:string){
       this.http.get<Sales[]>(this.url + '/sales/' + userId).subscribe(
        data =>{
          this._sales$.next(data)
        }
      )
    }

   getSales(){
    return this.sales$
  }

  createSale(sellerId:string, buyerId:string, products:any,total:number,address:Address){
    this.http.post(this.url + '/create-sale', {sellerId, buyerId, products,total,address}).subscribe()
  }
}
