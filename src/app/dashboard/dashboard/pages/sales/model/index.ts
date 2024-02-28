import { Address } from "src/app/auth/models";
import { Products } from "../../products/models";

export interface Sales {
    _id: string,
    sellerId:string,
    buyerId:string,
    products: [
        productId:any,
        quantity:any
    ],
    total:number,
    address:Address,
    date: Date
}