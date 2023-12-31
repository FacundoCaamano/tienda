import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL = 'http://localhost:3000/carrito-pro/auth'

  private _errorMessages$ = new BehaviorSubject<string>('')
  public errorMessages$ = this._errorMessages$.asObservable()

  constructor(private http: HttpClient , private router:Router) { 

  }
  login(email: string, password: string){
    this.http.post(this.URL, {email, password})
    .subscribe(
      res => {
        this.router.navigate(['/dashboard'])
      },
      error =>{
        this._errorMessages$.next('email o contraseña incorrecta')
      }
    )
   
  }

}
