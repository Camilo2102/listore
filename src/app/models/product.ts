import GeneralModel from "./general";
import InventoryModel from "./inventory";
import Supplier from "./supplier";

export class ProductModel extends GeneralModel {

    name: string;
    unitaryValue: number;
    wholeSalePrice: number;
    supplier: Supplier;
    category: string;
    inventory: InventoryModel;
    amount: number;

}