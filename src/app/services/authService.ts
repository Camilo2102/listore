import CredentialModel from "@/models/credential";
import { HttpFactory } from "../utils/httpFactory";
import { ToastService } from "./toastService";
import { CRUDFactory } from "../../models/CRUDFactory";
import RegisterUserDTO from "../dto/registerUserDTO";

export class AuthService extends CRUDFactory<CredentialModel>{

    private BASE_URL: string = "auth"

    constructor(){
        super("auth")        
    }

    /**
     * permite el inicio de sesion del usuario
     * @param crendential datos para el inicio de sesion
     * @returns respuesta del body de la peticion
     */
    public login (crendential: CredentialModel) {
        return HttpFactory.httpPost(this.BASE_URL + '/login', false, crendential);
    }


    /**
     * SE encarga de generar la peticion para poder registrar un usario
     * @param registerUser Usuario a registerar en el sistema
     * @returns El estado de la creacion del usuario
     */
    public register(registerUser: RegisterUserDTO) {
        return HttpFactory.httpPost(this.BASE_URL + "/register", false, registerUser);
    }

    

    
}