import General from "./general";
import  ProductModel  from "./product";
import User from "./user";

export default class SaleModel extends General{
    saleDate?: Date;
    unitaryValue?: number;
    amount?: number;
    product?: ProductModel;
    user?: User;
}