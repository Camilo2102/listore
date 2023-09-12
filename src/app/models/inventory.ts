import Company from "./company";
import General from "./general";

export default class InventoryModel extends General{
    name?: string;
    description?: string;
    category?: string;
    company?: Company;
}