import { Component } from '@angular/core';
import { user } from '../../models';
import { AuthService } from '../../service/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private authService:AuthService){}

  controlName = new FormControl<string | null>('',Validators.required)
  controlSurname = new FormControl<string | null>('', Validators.required)
  controlEmail = new FormControl<string | null>('', Validators.required)
  controlPassword = new FormControl<string | null>('', Validators.required)

  formRegister = new FormGroup({
    name:this.controlName,
    surname:this.controlSurname,
    email:this.controlEmail,
    password:this.controlPassword,
  })
  register(){
    
    if(this.formRegister.invalid){
      this.formRegister.markAllAsTouched()
    }
    else{
      const data = {
        name: this.controlName.value as string,
        surname: this.controlSurname.value as string,
        email: this.controlEmail.value as string,
        password: this.controlPassword.value as string
      }
      this.authService.register(data)
      
    }
  }
}
