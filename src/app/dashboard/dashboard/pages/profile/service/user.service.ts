import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Address, user, userData } from 'src/app/auth/models';
import { AuthService } from 'src/app/auth/service/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = environment.api

  private _buys$ = new BehaviorSubject([])
  private buys$ = this._buys$.asObservable()

  

  constructor(
    private http:HttpClient,
    private authService:AuthService
    ) {}


  loadBuys(id:string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')!
      })
    }
    this.http.get(this.url + '/buys/' + id, httpOptions).subscribe({
      next: (data:any)=>{
        this._buys$.next(data)
      }
    })
  }
  getBuys(){
    return this._buys$
  }
  

 
}