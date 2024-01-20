import { Products } from "src/app/dashboard/dashboard/pages/products/models"

export interface user{
    name:string,
    surname:string,
    email:string,
    password:string,
}

export interface userData  {
    id:string,
    name:string,
    surname:string,
    email:string,
    role:string,
    cart: string
}

export interface AuthRes {
    message:string,
    user:user
}