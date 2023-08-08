import { CRUDFactory } from "../models/CRUDFactory";
import SpentModel from "../models/spent";

export class SpentService extends CRUDFactory<SpentModel>{
    constructor(){
        super("spent")
    }
}