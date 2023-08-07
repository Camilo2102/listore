import { CRUDFactory } from "../models/CRUDFactory";
import SaleModel from "../models/sale";

export class SaleService extends CRUDFactory<SaleModel>{
    constructor(){
        super("sale")
    }
}