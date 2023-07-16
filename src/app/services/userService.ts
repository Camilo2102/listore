import { CRUDFactory } from "@/app/models/CRUDFactory";
import User from "@/app/models/user";


export class UserService extends CRUDFactory<User>{

    constructor(){
        super("user")        
    }


}