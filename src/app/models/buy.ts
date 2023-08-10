import General from "./general";
import  ProductModel  from "./product";
import User from "./user";

export default class BuyModel extends General{
    buyDate?: Date;
    price?: number;
    amount?: number;
    product?: ProductModel;
    user?: User;
}