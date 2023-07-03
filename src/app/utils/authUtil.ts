export class AuthUtil {

    /**
     * Agrega al local storage el jwt
     * @param token token generado por el back
     */
    public static setCredentials(token: string) : void {
        localStorage.setItem("token", token);
    }

    /**
     * Obtiene el jwt almacenado
     * @returns jwt almacenado
     */
    public static getCredentials(): string | null{
        return localStorage.getItem('token');
    }
}