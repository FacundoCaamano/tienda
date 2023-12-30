import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  controlEmail = new FormControl('', Validators.required)
  controlPassword = new FormControl('', Validators.email)

  formLogin = new FormGroup({
    email:this.controlEmail,
    password:this.controlPassword
  })

  login(){
    if(this.formLogin.invalid){
      this.formLogin.markAllAsTouched()
    }
    else{
      alert('login')
    }
  }
}
