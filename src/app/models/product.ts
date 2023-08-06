import General from "./general";
import InventoryModel from "./inventory";
import Supplier from "./supplier";

export default class ProductModel extends General {
    name?: string;
    unitaryValue?: number;
    wholeSalePrice?: number;
    supplier?: Supplier;
    category?: string;
    inventory?: InventoryModel;
    amount?: number;

}