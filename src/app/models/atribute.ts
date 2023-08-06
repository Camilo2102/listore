import General from "./general";
import  ProductModel  from "./product";

export default class AtributesModel extends General{
    name?: string;
    value?: string;
    product?: ProductModel;

}