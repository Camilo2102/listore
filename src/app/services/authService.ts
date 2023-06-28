import CredentialModel from "@/models/credential";
import { HttpGenerator } from "../utils/httpGenerator";
import { ToastService } from "./toastService";

export class AuthService {

    // URL base del servicio
    private static BASEURL = 'auth';

    /**
     * permite el inicio de sesion del usuario
     * @param crendential datos para el inicio de sesion
     * @returns respuesta del body de la peticion
     */
    public static login (crendential: CredentialModel) {
        return HttpGenerator.httpPost(this.BASEURL + '/login', false, crendential);
    }


    public static getCredentials() {
        return HttpGenerator.httpGet(this.BASEURL, true);
    }
}