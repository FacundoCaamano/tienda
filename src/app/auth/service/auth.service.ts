import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Address, user, userData } from '../models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public URL = environment.api;

  private _errorMessages$ = new BehaviorSubject<string>('');
  public errorMessages$ = this._errorMessages$.asObservable();

  public _user$ = new BehaviorSubject<userData | null>(null);
  public user$ = this._user$.asObservable();

  private _address$ = new BehaviorSubject<Address[]>([]);
  public address$ = this._address$.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    this.http.post(`${this.URL}/auth`, { email, password }).subscribe(
      (res: any) => {
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

  isAuthenticated() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  register(userData: user) {
    this.http.post(this.URL + '/users', userData).subscribe(
      res => {
        this.router.navigate(['/auth/login']);
      }
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
    this._user$.next(null);
  }

  editUser(id: string, data: any) {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     Authorization: localStorage.getItem('token')!
    //   })
    // };

    this.http
      .put(`${this.URL}/users/edituser/${id}`, data)
      .subscribe({
        next: (res: any) => {
          // Actualiza el observable _user$ con los nuevos datos
          const updatedUser: userData = {
            id: id,
            name: data.name,
            surname: data.surname,
            email: data.email,
            role: data.role,
            cart: data.cart
          };
          this._user$.next(updatedUser);

          // Actualiza el token almacenado en localStorage si hay un nuevo token devuelto por el backend
          if (res.token) {
            localStorage.setItem('token', res.token);
          }
        },
        error: (error: any) => {
          console.error(error);
        }
      });
  }

  loadAddresses() {
    this.user$.subscribe(data => {
      if (data?.addresses) {
        this._address$.next(data?.addresses);
      }
    });
  }

  getAddresses() {
    return this.address$;
  }

  deleteAddress(userid: string, addressId: string) {
    this.http
      .delete(`${this.URL}/users/address/${userid}/${addressId}`)
      .subscribe({
        next: (data: any) => {
          if (data.token) {
            localStorage.setItem('token', data.token);
          }
          const updatedAddresses = this._address$.value.filter(
            address => address._id !== addressId
          );
          this._address$.next(updatedAddresses);
        },
        error: () => {
          console.log('error');
        },
        complete: () => {
          console.log('complete');
        }
      });
  }

  addAddress(address: any, userId: string) {
    this.http
      .post(`${this.URL}/users/address/${userId}`, { address })
      .subscribe({
        next: (res:any) => {
          if (res.token) {
            localStorage.setItem('token', res.token);
          }
          const updatedAddresses = [...this._address$.value, address];
          this._address$.next(updatedAddresses);
        },
        error: () => {
          console.log('error');
        },
        complete: () => {
          console.log('complete');
        }
      });
  }
}
