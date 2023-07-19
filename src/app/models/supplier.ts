import General from "./general";
import InventoryModel from "./inventory";

export default class SupplierModel extends General{
    name: string;
    phone: number;
    mail: string;
    address: string;
    description: string;
    inventory: InventoryModel;
}