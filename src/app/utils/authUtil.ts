export class AuthUtil {

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
}