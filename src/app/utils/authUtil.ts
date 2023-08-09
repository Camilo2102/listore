import { StorageService } from "../services/storageService";

export class AuthUtil {
    public static AUTHORIZED: boolean = StorageService.getValue('authorized') === 'true';
    /**
     * Agrega al local storage el jwt
     * @param token token generado por el back
     */
    public static setCredentials(token: string, company: string, user: string) : void {
        StorageService.saveValue("token", token);
        StorageService.saveValue("company", company);
        StorageService.saveValue("user", user);
    }

    /**
     * Obtiene el jwt almacenado
     * @returns jwt almacenado
     */
    public static getCredentials(): any | null{
        const credentials = {
            token: StorageService.getValue('token'),
            company: StorageService.getValue('company'),
            user: StorageService.getValue('user'),
        }
        return credentials;
    }

    /**
     * Obtiene el estado para saber si esta autenticado en el sistema
     * @returns el estado de la authorizacion
     */
    public static isAuthorized(){
        return this.AUTHORIZED;
    }

    /**
     * Asigna el valor a authorized
     * @param state es el estado que se le va a asignar
     */
    public static setAuthorized(state: boolean){
        StorageService.saveValue('authorized', state + '');
        this.AUTHORIZED = state;
    }
}