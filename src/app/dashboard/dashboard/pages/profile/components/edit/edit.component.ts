import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { userData } from 'src/app/auth/models';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

 @Input() user!: userData | null 
 @Output() edit = new EventEmitter()

 controlName = new FormControl<string | undefined>('', Validators.required)
 controlSurname = new FormControl<string | undefined>('',Validators.required)
 controlEmail = new FormControl<string | undefined>('',Validators.required)
 controlRole = new FormControl<string | undefined>('',Validators.required)

 formUser = new FormGroup({
  name: this.controlName,
  surname: this.controlSurname,
  email:this.controlEmail,
  role:this.controlRole
 })
  
 constructor(private userService:UserService){
}
ngOnInit(): void {
  this.controlName.setValue(this.user?.name)
  this.controlSurname.setValue(this.user?.surname)
  this.controlEmail.setValue(this.user?.email)
  this.controlRole.setValue(this.user?.role)
   
    
  }

  onSubmit(){
    if(this.formUser.invalid){
      this.formUser.markAllAsTouched()
    }
    else{
       const data = {
          id: this.user?.id,
          name: this.controlName.value,
          surname: this.controlSurname.value,
          email: this.controlEmail.value,
          role: this.controlRole.value
        }
       this.edit.emit(data)
      
     
      
    }
  }
}
