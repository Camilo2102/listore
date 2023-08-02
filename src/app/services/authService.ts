import CredentialModel from "@/app/models/credential";
import { HttpFactory } from "../utils/httpFactory";
import { ToastService } from "./toastService";
import { CRUDFactory } from "@/app/models/CRUDFactory";
import RegisterUserDTO from "../dto/registerUserDTO";
import RegisterWorkerDTO from "../dto/registerWorkerDTO";
import User from "../models/user";
import PasswordChange from "../models/passwordChange";

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
    

    /**
     * Se encarga de reestablecer la contraseña
     * @param passwordChange el objeto con los datos del registro
     * @returns la peticion para resetear la contraseña
     */
    public enableUser(passwordChange: PasswordChange){
        return HttpFactory.httpPost(this.BASE_URL+"/enableUser",false, passwordChange);
    }


    /**
     * Envia el mensaje al back para que valide la direccion de correo y envie el mensaje en caso de estar registrado
     * @param email el correo al que se va a enviar el mensaje
     * @returns el estado de envio del correo
     */
    public sendRecoveryEmail(email: string){
        return HttpFactory.httpGet(this.BASE_URL+ "/recoverPassword?mail=" + email, false);
    }

    /*
    TODO: limipar todo el storage
    Caundo se hago el cierre de sesion
    */
    
}