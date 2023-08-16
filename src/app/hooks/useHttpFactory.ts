"use client";
import { AuthUtil } from "../utils/authUtil"
import { ToastUtil } from "../utils/toastUtil";
import { Messages } from "../constants/messageConstant";
import { useAuthContext } from "../context/authContext";
import { useNavigationContext } from "../context/navigationContext";

export default function useHttpFactory() {
    const APIURL = "http://localhost:7879/";

    const { authorized, setAuthorized } = useAuthContext();

    /**
         * Valida si se requiere un token de autorización y lo agrega a los encabezados de la petición.
         * @param secure Indica si es necesaria la autorización.
         * @param headers Los encabezados a los que se agregará el token de autorización.
         */
    const requireToken = (secure: boolean, headers: Headers) => {
        headers.append('Content-Type', 'application/json');

        if (secure) {
            const token = AuthUtil.getCredentials().token;
            if (token) {
                headers.append('Authorization', `${token}`);
            } else {
                ToastUtil.showError(Messages.MESSAGE_WARN, Messages.MESSAGE_NO_TOKEN);
            }
        } else {
            headers.delete('Authorization');
        }
    }

    /**
         * Maneja la respuesta de la petición fetch, realizando validaciones y parseando los datos.
         * @param fetchPetition La petición fetch a la cual se le va a aplicar la validación de los datos.
         * @returns Una promesa que se resuelve con los datos obtenidos si la respuesta es exitosa.
         */
    const handleFetchPetition = (fetchPetition: Promise<any>): Promise<any> => {
        return fetchPetition.then(
            res => {
                if (res.status >= 200 && res.status < 300) {
                    return res.json();
                }
                throw res;
            }
        ).catch(
            err => {
                err.json().then((res: any) => {
                    if (res.status === 401) {
                        setAuthorized(false);
                    }
                    ToastUtil.showError(Messages.MESSAGE_ERROR, res.error);
                });
            }
        );
    }


    /**
     * Realiza una solicitud HTTP GET.
     * @param url El endpoint a concatenar con la ruta base.
     * @param secure Indica si se requiere un encabezado de autorización.
     * @returns Una promesa que se resuelve con la respuesta obtenida mediante fetch.
     */
    const httpGet = (url: string, secure: boolean): Promise<any> => {
        const headers = new Headers();
        requireToken(secure, headers);


        const fetchPetition = fetch(APIURL + url, {
            method: "GET",
            headers: headers,
        });

        return handleFetchPetition(fetchPetition);
    }

    /**
     * Realiza una solicitud HTTP POST.
     * @param url El endpoint a concatenar con la ruta base.
     * @param secure Indica si se requiere un encabezado de autorización.
     * @param body El cuerpo a enviar en el método POST.
     * @returns Una promesa que se resuelve con la respuesta obtenida mediante fetch.
     */
    const httpPost = (url: string, secure: boolean, body: any): Promise<any> => {
        const headers = new Headers();
        requireToken(secure, headers);

        const fetchPetition = fetch(APIURL + url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body),
        });

        return handleFetchPetition(fetchPetition);
    }

    /**
     * Realiza una solicitud HTTP PUT.
     * @param url El endpoint a concatenar con la ruta base.
     * @param secure Indica si se requiere un encabezado de autorización.
     * @param body El cuerpo a enviar en el método PUT.
     * @returns Una promesa que se resuelve con la respuesta obtenida mediante fetch.
     */
    const httpPut = (url: string, secure: boolean, body: any): Promise<any> => {
        const headers = new Headers();
        requireToken(secure, headers);

        const fetchPetition = fetch(APIURL + url, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(body),
            mode: "cors"
        });

        return handleFetchPetition(fetchPetition);
    }

    /**
     * Realiza una solicitud HTTP DELETE.
     * @param url El endpoint a concatenar con la ruta base.
     * @param secure Indica si se requiere un encabezado de autorización.
     * @returns Una promesa que se resuelve con la respuesta obtenida mediante fetch.
     */
    const httpDelete = (url: string, secure: boolean): Promise<any> => {
        const headers = new Headers();
        requireToken(secure, headers);

        const fetchPetition = fetch(APIURL + url, {
            method: "DELETE",
            headers: headers,
            mode: "cors"
        });

        return handleFetchPetition(fetchPetition);
    }
    
    return {
        httpGet,
        httpPost,
        httpPut,
        httpDelete
    };


}