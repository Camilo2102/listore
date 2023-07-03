import CredentialModel from "@/models/credential";
import { HttpFactory } from "../utils/httpFactory";
import { ToastService } from "./toastService";
import { CRUDFactory } from "../../models/CRUDFactory";

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

    

    
}