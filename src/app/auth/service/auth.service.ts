import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, of } from 'rxjs';
import { user, userData } from '../models';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public URL = environment.api

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
    this._user$.next(null);
  }

 
   editUser(id: string, data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')!
      })
    };
  
    this.http.put(this.URL + '/users/edituser/' + id, data, httpOptions).subscribe({
      next: () => {
        // Actualizar el observable _user$ con los nuevos datos
        const updatedUser: userData = {
          id: id,
          name: data.name,
          surname: data.surname,
          email: data.email,
          role: data.role,
          cart: data.cart
        };
        this._user$.next(updatedUser);
      },
      error: (error: any) => {
        // Manejar cualquier error
        console.error(error);
      }
    });

  }

}
