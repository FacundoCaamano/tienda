import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { user, userData } from 'src/app/auth/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = environment.api

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