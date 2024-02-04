export interface Products{
    _id:string,
    title:string,
    price:number,
    thumbnail:Array<string>,
    description:string,
    code:string,
    stock:number,
    sellerId:string
}

export type CreateProduct = Omit<Products, '_id'>