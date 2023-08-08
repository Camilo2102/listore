import General from "./general";
import User from "./user";

export default class SpentModel extends General{
    spentDate?: Date;
    price?: number;
    description?: string;
    user?: User;
}