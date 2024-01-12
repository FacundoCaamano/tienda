import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { user } from 'src/app/auth/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'http://localhost:3000/carrito-pro'

  private _user$ = new BehaviorSubject<user | null>(null)
  private user$ = this._user$.asObservable()

  private _buys$ = new BehaviorSubject([])
  private buys$ = this._buys$.asObservable()

  constructor(private htpp:HttpClient) {}


  loadBuys(id:string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')!
      })
    }
    this.htpp.get(this.url + '/buys/' + id, httpOptions).subscribe({
      next: (data:any)=>{
        this._buys$.next(data)
      }
    })
  }
  getBuys(){
    return this._buys$
  }
  
}
