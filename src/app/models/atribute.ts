import GeneralModel from "./general";
import { ProductModel } from "./product";

export default class AtributesModel extends GeneralModel{
    name?: string;
    value?: string;
    product?: ProductModel;

}