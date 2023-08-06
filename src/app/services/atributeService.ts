import { CRUDFactory } from "../models/CRUDFactory";
import AtributesModel from "../models/atribute";

export class AtributeService extends CRUDFactory<AtributesModel>{
    constructor(){
        super("atributes")
    }
}