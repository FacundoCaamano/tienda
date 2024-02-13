import { Products } from "../../products/models";

export interface Sales {
    _id: string,
    sellerId:string,
    buyerId:string,
    products: Array<Products>,
    date: Date
}