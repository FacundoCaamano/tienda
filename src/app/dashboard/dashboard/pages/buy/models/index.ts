import { Address } from "src/app/auth/models";
import { Products } from "../../products/models";

export interface Buy{
    userId : string,
    products: Array<Products>,
    total:number,
    address:Address
    fecha:Date
}