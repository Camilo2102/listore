import StorageService from "../services/storageService";



export default function AuthUtil() {
    const {saveValue, getValue} = StorageService();
    /**
     * Agrega al local storage el jwt
     * @param token token generado por el back
     */
    const setCredentials = (token: string, company: string, user: string, role: string): void => {
        saveValue("token", token);
        saveValue("company", company);
        saveValue("user", user);
        saveValue("role", role);
    };

    /**
     * Obtiene el jwt almacenado
     * @returns jwt almacenado
     */
    const getCredentials = (): any | null => {
        const credentials = {
            token: getValue('token'),
            company: getValue('company'),
            user: getValue('user'),
            role: getValue('role')
        };
        return credentials;
    };

    return{
        setCredentials,
        getCredentials
    }
}
