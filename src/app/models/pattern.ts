import General from "./general";
import InventoryModel from "./inventory";

export default class PatternModel extends General{
    name?: string;
    inventory?: InventoryModel;
}