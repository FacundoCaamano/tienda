import { Products } from "../../../../products/models";

export interface Buy{
    _id:string,
    userId:string,
    products:Products[],
    total:number,
    fecha:Date
}