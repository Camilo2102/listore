import { CRUDFactory } from "../models/CRUDFactory";
import SupplierModel from "../models/supplier";

export class SupplierService extends CRUDFactory<SupplierModel>{
    constructor(){
        super("supplier")
    }
}