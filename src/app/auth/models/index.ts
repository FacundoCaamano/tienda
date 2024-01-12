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
}

export interface AuthRes {
    message:string,
    user:user
}