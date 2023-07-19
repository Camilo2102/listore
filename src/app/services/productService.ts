import { CRUDFactory } from "../models/CRUDFactory";
import { ProductModel } from "../models/product";

export class ProductService extends CRUDFactory<ProductModel>{
    constructor(){
        super("product")
    }
}