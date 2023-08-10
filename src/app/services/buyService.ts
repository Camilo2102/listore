import { CRUDFactory } from "../models/CRUDFactory";
import BuyModel from "../models/buy";

export class BuyService extends CRUDFactory<BuyModel>{
    constructor(){
        super("buy")
    }
}