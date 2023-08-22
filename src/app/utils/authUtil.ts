import { StorageService } from "../services/storageService";

export class AuthUtil {
    /**
     * Agrega al local storage el jwt
     * @param token token generado por el back
     */
    public static setCredentials(token: string, company: string, user: string, role: string) : void {
        StorageService.saveValue("token", token);
        StorageService.saveValue("company", company);
        StorageService.saveValue("user", user);
        StorageService.saveValue("role", role);
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
            role: StorageService.getValue('role')
        }
        return credentials;
    }

}