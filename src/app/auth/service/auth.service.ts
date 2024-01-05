import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { AuthRes, user } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL = 'http://localhost:3000/carrito-pro'

  private _errorMessages$ = new BehaviorSubject<string>('')
  public errorMessages$ = this._errorMessages$.asObservable()
  private _user$ = new BehaviorSubject<user | null>(null)
  public user$ = this._user$.asObservable()
  constructor(private http: HttpClient , private router:Router) { 

  }
  login(email: string, password: string) {
    this.http.post(this.URL + '/auth', { email, password }).subscribe(
      (res: any) => { // Usa la interfaz aquí
        console.log(res);
        this._user$.next(res.user);
        localStorage.setItem('user', JSON.stringify(res.user) )
        this.router.navigate(['/dashboard/home']);
      },
      error => {
        this._errorMessages$.next('email o contraseña incorrecta');
      }
    );
  }
  register(userData:user){
    this.http.post(this.URL + '/users', userData).subscribe(
      res => {
        this.router.navigate(['/auth/login'])
      }
    )
  }
  logout(){
    this._user$.next(null)
    localStorage.removeItem('user')
    this.router.navigate(['/auth/login'])
  }

  checkSession(){
    const user = localStorage.getItem('user')
    if(user){
      this._user$.next(JSON.parse(user))
    }
  }

}
