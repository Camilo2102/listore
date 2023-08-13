import RegisterUserDTO from "@/app/dto/registerUserDTO";
import CredentialModel from "@/app/models/credential";
import PasswordChange from "@/app/models/passwordChange";
import User from "@/app/models/user";
import useHttpFactory from "../useHttpFactory";
import useCRUDFactory from "../useCRUDFactory";


export default function useAuthService(){
    const endpoint: string = "auth"

    const {httpGet, httpPost, httpDelete} = useHttpFactory();

    /**
     * permite el inicio de sesion del usuario
     * @param crendential datos para el inicio de sesion
     * @returns respuesta del body de la peticion
     */
    const login = (crendential: CredentialModel) => {
        return httpPost(endpoint + '/login', false, crendential);
    }


    /**
     * SE encarga de generar la peticion para poder registrar un usario
     * @param registerUser Usuario a registerar en el sistema
     * @returns El estado de la creacion del usuario
     */
    const register = (registerUser: RegisterUserDTO) => {
        return httpPost(endpoint + "/register", false, registerUser);
    }


    /**
     * Permite el registro de un usuario dentro de la organizacion
     * @param registerWorker el usuario a registrar
     * @returns el estado de la creacion del usuario
     */
    const registerUser = (registerWorker: User) => {
        return httpPost(endpoint + "/registerUser", true, registerWorker)
    }


    /**
     * Valida que las credenciales no esten registradas previamente
     * @param credential El lado a validar(Contraseña o nombre de usuario)
     * @returns la peticion para obtener el estado
     */
    const validateCredential = (credential: string): Promise<any> => {
        return httpGet(endpoint+`/validateCredential?credential=${credential}`, false);
    }

    /**
     * Se encarga de deshabilitar el usuario creado
     * @param id el id del usuario a eliminar
     * @returns el estado de la eliminacion
     */
    const disableUser = (id: string) => {
        return httpDelete(endpoint+`/disableUser?id=${id}`, true)
    }
    

    /**
     * Se encarga de reestablecer la contraseña
     * @param passwordChange el objeto con los datos del registro
     * @returns la peticion para resetear la contraseña
     */
    const enableUser = (passwordChange: PasswordChange) => {
        return httpPost(endpoint+"/enableUser",false, passwordChange);
    }


    /**
     * Envia el mensaje al back para que valide la direccion de correo y envie el mensaje en caso de estar registrado
     * @param email el correo al que se va a enviar el mensaje
     * @returns el estado de envio del correo
     */
    const sendRecoveryEmail = (email: string) => {
        return httpGet(endpoint+ "/recoverPassword?mail=" + email, false);
    }

    /**
     * Envia una peticion para validar que el token fue enviado correctamente
     * @returns la peticion para validar el token
     */
    const validateToken = () => {
        return httpGet(endpoint+ "/validateToken", true);
    }

    return{
        login,
        register,
        registerUser,
        validateCredential,
        disableUser,
        enableUser,
        sendRecoveryEmail,
        validateToken,
    }

    
}