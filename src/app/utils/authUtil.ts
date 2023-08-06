export class AuthUtil {
    public static AUTHORIZED = false;
    /**
     * Agrega al local storage el jwt
     * @param token token generado por el back
     */
    public static setCredentials(token: string, company: string) : void {
        localStorage.setItem("token", token);
        localStorage.setItem("company", company);
    }

    /**
     * Obtiene el jwt almacenado
     * @returns jwt almacenado
     */
    public static getCredentials(): any | null{
        const credentials = {
            token: localStorage.getItem('token'),
            company: localStorage.getItem('company'),
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
        this.AUTHORIZED = state;
    }
}