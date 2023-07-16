import { CRUDFactory } from "../models/CRUDFactory";
import InventoryModel from "../models/inventory";

export class InventoryService extends CRUDFactory<InventoryModel>{
    constructor(){
        super("inventory")
    }
}