import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  message = ''
  constructor() { }


  successful(){
    this.message = 'accion completada correctamente'
    return this.message
  }

  addAddress(){
    this.message = 'direccion agregada'
    return this.message
  }

  buy(){
    this.message = 'Producto comprado'
    return this.message
  }

  cartBuy(){
    this.message = 'Carrito comprado correctamente'
    return this.message
  }

  error(){
    this.message = 'ocurrio un error inesperado'
  }

  clearMessage(){
    this.message = ''
    return this.message
  }
}
