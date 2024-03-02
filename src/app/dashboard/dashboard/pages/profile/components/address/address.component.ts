import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Observable, take } from 'rxjs';
import { NotifierService } from 'src/app/core/service/notifier.service';
import {  Address, userData } from 'src/app/auth/models';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  addressForm!: FormGroup;
  userId!:string 
  addresses!: Observable<Address[]>; // Cambiado a Observable<Address[]>
  message:string = ''
  
  constructor(
    private fb: FormBuilder,
    private userService:UserService,
    private authService:AuthService,
    private notifierService:NotifierService
  ) {
    
    
  }
  
  ngOnInit(): void {
    this.addressForm = this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      num: ['', Validators.required],
      province: ['', Validators.required],
      postalCode: ['', Validators.required]
    });
    
    this.authService.user$.pipe(take(1)).subscribe(
      data => {
        if(data){  
          this.userId = data.id;
          // Solo cargamos las direcciones una vez al iniciar el componente
         
          // Obtenemos las direcciones, pero no necesitamos volver a cargarlas más tarde
          this.addresses = this.authService.getAddresses();
          console.log(this.addresses);
        }
      }
    );
    console.log(this.addresses);
  }

  onSubmit(): void {
   if(this.addressForm.invalid){
    this.addressForm.markAllAsTouched()
   }
   else{
    this.authService.addAddress(this.addressForm.value, this.userId)
    this.message = this.notifierService.addAddress()
    this.addressForm.reset()
   }
  }

  clearMessage(){
    this.message = ''
    this.notifierService.clearMessage()
  }

  deleteAddress(addressId:string){
    this.authService.deleteAddress(this.userId, addressId);
    // No necesitamos hacer nada más aquí, ya que el cambio se reflejará en el observable automáticamente
  }
}
