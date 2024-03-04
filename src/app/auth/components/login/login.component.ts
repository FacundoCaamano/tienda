import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loader:Observable<boolean>
  errorMesages$
  constructor(private authService:AuthService){
    this.loader = this.authService._isLoading$
    this.errorMesages$ = this.authService.errorMessages$
  }

  controlEmail = new FormControl<string | null>('UsuarioDePrueba@gmail.com', Validators.required)
  controlPassword = new FormControl<string | null>('UsuarioDePrueba', Validators.required)

  formLogin = new FormGroup({
    email:this.controlEmail,
    password:this.controlPassword
  })

  login(){
    if(this.formLogin.valid){
      this.authService._isLoading$.next(true)
       this.authService.login(this.controlEmail.value as string, this.controlPassword.value as string)
    }
    if(this.formLogin.invalid){
      this.formLogin.markAllAsTouched()
      console.log('invalido')
    }
  }
}
