import CredentialModel from "@/app/models/credential";
import { HttpFactory } from "../utils/httpFactory";
import { ToastService } from "./toastService";
import { CRUDFactory } from "@/app/models/CRUDFactory";
import RegisterUserDTO from "../dto/registerUserDTO";
import RegisterWorkerDTO from "../dto/registerWorkerDTO";
import User from "../models/user";

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


    /**
     * Permite el registro de un usuario dentro de la organizacion
     * @param registerWorker el usuario a registrar
     * @returns el estado de la creacion del usuario
     */
    public registerUser(registerWorker: User) {
        return HttpFactory.httpPost(this.BASE_URL + "/registerUser", true, registerWorker)
    }


    /**
     * Valida que las credenciales no esten registradas previamente
     * @param credential El lado a validar(Contraseña o nombre de usuario)
     * @returns la peticion para obtener el estado
     */
    public validateCredential(credential: string): Promise<any> {
        return HttpFactory.httpGet(this.BASE_URL+`/validateCredential?credential=${credential}`, false);
    }

    /**
     * Se encarga de deshabilitar el usuario creado
     * @param id el id del usuario a eliminar
     * @returns el estado de la eliminacion
     */
    public disableUser(id: string) {
        return HttpFactory.httpDelete(this.BASE_URL+`/disableUser?id=${id}`, true)
    }
    

    
}