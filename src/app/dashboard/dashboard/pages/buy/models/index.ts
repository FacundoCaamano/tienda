import { Products } from "../../products/models";

export interface Buy{
    userId : string,
    products: Array<Products>,
    total:number,
    fecha:Date
}