import { Address } from "src/app/auth/models";
import { Products } from "../../products/models";

export interface Sales {
    _id: string,
    sellerId:string,
    buyerId:string,
    products: Array<Products>,
    address:Address,
    date: Date
}