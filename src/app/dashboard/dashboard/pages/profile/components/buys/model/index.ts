import { Address } from "src/app/auth/models";
import { Products } from "../../../../products/models";

export interface Buy{
    _id:string,
    userId:string,
    products:[{
        products:Products,
        quantity:Number
    }],
    address:Address,
    total:number,
    fecha:Date
}