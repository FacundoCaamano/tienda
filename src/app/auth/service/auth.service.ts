import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL = 'localhost:3000/carrito-pro/auth'

  constructor(private http: HttpClient , private router:Router) { 

  }
  login(email: string, password: string){
    this.http.post(this.URL, {email, password})
    .subscribe(
      res => {
        this.router.navigate(['/dashboard'])
      }
    )
   
  }

}
