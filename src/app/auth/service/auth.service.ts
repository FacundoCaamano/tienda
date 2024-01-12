import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { AuthRes, user, userData } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL = 'http://localhost:3000/carrito-pro'

  private _errorMessages$ = new BehaviorSubject<string>('')
  public errorMessages$ = this._errorMessages$.asObservable()
  public _user$ = new BehaviorSubject<userData | null>(null)
  public user$ = this._user$.asObservable()
  constructor(private http: HttpClient, private router: Router) {

  }
  login(email: string, password: string) {
    this.http.post(`${this.URL}/auth`, { email, password }).subscribe(
      (res: any) => {
        // Almacenar el token en localStorage
        localStorage.setItem('token', res.token);
        this.router.navigate(['/dashboard/home']);
        console.log('localStorage', localStorage.getItem('token'));
        
      },
      error => {
        if (error.status === 401) {
          this._errorMessages$.next('Email o contraseña incorrecta');
        } else {
          console.error('Error al iniciar sesión', error);
        }
      }
    );
  }


  checkSession() {
    const token = localStorage.getItem('token');
    if (token) {
      this._user$.next(JSON.parse(atob(token.split('.')[1])));
    }
  }

  isAuthenticated(){
    const token = localStorage.getItem('token');
    return !!token
  }

  register(userData: user) {
    this.http.post(this.URL + '/users', userData).subscribe(
      res => {
        this.router.navigate(['/auth/login'])
      }
    )
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']); 
  }

 
  

}
