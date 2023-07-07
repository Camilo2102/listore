import { CRUDFactory } from "@/models/CRUDFactory";
import User from "@/models/user";


export class UserService extends CRUDFactory<User>{

    private BASE_URL: string = "user"

    constructor(){
        super("user")        
    }


}