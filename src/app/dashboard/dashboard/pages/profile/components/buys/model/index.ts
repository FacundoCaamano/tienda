import { Address } from "src/app/auth/models";
import { Products } from "../../../../products/models";

export interface Buy{
    _id:string,
    userId:string,
    products:Products[],
    address:Address,
    total:number,
    fecha:Date
}