import { Products } from "../../products/models";

export interface Cart {
    _id: string
    products: Array<Products>
}