'use client';

import { useRouter } from "next/navigation";
import { AuthUtil } from "./authUtil";
import { withRouter } from 'next/router'
import { ToastService } from "../services/toastService";
import { Messages } from "../constants/generalConstant";

const headers = new Headers();

headers.append('Content-Type', 'application/json')
headers.append('Access-Control-Allow-Origin', '*')

export class HttpFactory {
    //URL de la api
    private static APIURL = "http://localhost:7879/"

    /**
     * 
     * @param url endpoint a concatenar con la ruta base
     * @param secure indica si requiere header de autorizacion
     * @returns la respuesta del objeto obtenido con fetch para ser usado en el servicio
     */
    public static httpGet(url: string, secure: boolean): Promise<any> {
        this.requireToken(secure);
        const fethPetition = fetch(this.APIURL + url, {
            method: "GET",
            headers: headers
        });
        return this.handleFetchPetition(fethPetition);
    }


    /**
     * 
     * @param url endpoint a concatenar con la ruta base
     * @param secure indica si requiere header de autorizacion
     * @param body cuerpo a enviar en el metodo post
     * @returns la respuesta del objeto obtenido con fetch para ser usado en el servicio
     */
    public static httpPost(url: string, secure: boolean, body: any): Promise<any> {
        this.requireToken(secure);
        const fetchPetition = fetch(this.APIURL + url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        });
        return this.handleFetchPetition(fetchPetition);     
    }


    /**
     * 
     * @param url endpoint a concatenar con la ruta base
     * @param secure indica si requiere header de autorizacion
     * @param body cuerpo a enviar en el metodo put
     * @returns la respuesta del objeto de la peticion
     */
    public static httpPut(url: string, secure: boolean, body: any): Promise<any> {
        this.requireToken(secure);
        const fetchPetition = fetch(this.APIURL + url, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(body)
        });
        return this.handleFetchPetition(fetchPetition);
    }

    /**
     * 
     * @param url endpoint a concatenar con la ruta base
     * @param secure indica si requiere header de autorizacion
     * @param id id del elemento a eliminar
     * @returns la respuesta del objeto de la peticion
     */
    public static httpDelete(url: string, secure: boolean): Promise<any> {
        this.requireToken(secure);
        const fethPetition = fetch(this.APIURL + url, {
            method: "DELETE",
            headers: headers,
        });
        return this.handleFetchPetition(fethPetition); 
    }

    /**
     * Se encarga de manejar la respuesta del servidor, haciendo validaciones y parseando la data
     * @param fetchPetition obtiene la peticion fetch a la cual se le va a aplicar la validacion de los datos
     * @returns la peticion, pero con los valores controlados
     */
    private static handleFetchPetition(fetchPetition: Promise<any>) {
        return fetchPetition.then(
            res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res);
            }
        ).catch(
            err => {
                err.json().then((res: any) => {
                    ToastService.showError(Messages.MESSAGE_ERROR, res.error)
                });
            }
        )
    }

    /**
     * Valida si se requiere el token y lo agrega a los headers de la peticion
     * @param secure le indica si es segura o no la peticion
     */
    private static requireToken(secure: boolean) {
        if(secure) {
            const token = AuthUtil.getCredentials();
            if(token) {
                headers.append('authorization', token);
            }
        } else {
            headers.delete('authorization');
        }
    }
}