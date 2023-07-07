'use client';

import { useRouter } from "next/navigation";
import { AuthUtil } from "./authUtil";
import { withRouter } from 'next/router'
import { ToastService } from "../services/toastService";
import { Messages } from "../constants/generalConstant";

export class HttpFactory {
    private static APIURL = "http://localhost:7879/";
    
    /**
     * Realiza una solicitud HTTP GET.
     * @param url El endpoint a concatenar con la ruta base.
     * @param secure Indica si se requiere un encabezado de autorización.
     * @returns Una promesa que se resuelve con la respuesta obtenida mediante fetch.
     */
    public static httpGet(url: string, secure: boolean): Promise<any> {
      const headers = new Headers();
      this.requireToken(secure, headers);
      
      
      const fetchPetition = fetch(this.APIURL + url, {
        method: "GET",
        headers: headers
      });
      
      return this.handleFetchPetition(fetchPetition);
    }
    
    /**
     * Realiza una solicitud HTTP POST.
     * @param url El endpoint a concatenar con la ruta base.
     * @param secure Indica si se requiere un encabezado de autorización.
     * @param body El cuerpo a enviar en el método POST.
     * @returns Una promesa que se resuelve con la respuesta obtenida mediante fetch.
     */
    public static httpPost(url: string, secure: boolean, body: any): Promise<any> {
      const headers = new Headers();
      this.requireToken(secure, headers);
      
      const fetchPetition = fetch(this.APIURL + url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
      });
      
      return this.handleFetchPetition(fetchPetition);
    }
    
    /**
     * Realiza una solicitud HTTP PUT.
     * @param url El endpoint a concatenar con la ruta base.
     * @param secure Indica si se requiere un encabezado de autorización.
     * @param body El cuerpo a enviar en el método PUT.
     * @returns Una promesa que se resuelve con la respuesta obtenida mediante fetch.
     */
    public static httpPut(url: string, secure: boolean, body: any): Promise<any> {
      const headers = new Headers();
      this.requireToken(secure, headers);
      
      const fetchPetition = fetch(this.APIURL + url, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(body)
      });
      
      return this.handleFetchPetition(fetchPetition);
    }
    
    /**
     * Realiza una solicitud HTTP DELETE.
     * @param url El endpoint a concatenar con la ruta base.
     * @param secure Indica si se requiere un encabezado de autorización.
     * @returns Una promesa que se resuelve con la respuesta obtenida mediante fetch.
     */
    public static httpDelete(url: string, secure: boolean): Promise<any> {
      const headers = new Headers();
      this.requireToken(secure, headers);
      
      const fetchPetition = fetch(this.APIURL + url, {
        method: "DELETE",
        headers: headers
      });
      
      return this.handleFetchPetition(fetchPetition);
    }
    
    /**
     * Maneja la respuesta de la petición fetch, realizando validaciones y parseando los datos.
     * @param fetchPetition La petición fetch a la cual se le va a aplicar la validación de los datos.
     * @returns Una promesa que se resuelve con los datos obtenidos si la respuesta es exitosa.
     */
    private static handleFetchPetition(fetchPetition: Promise<any>): Promise<any> {
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
            ToastService.showError(Messages.MESSAGE_ERROR, res.error);
          });
        }
      );
    }
    
    /**
     * Valida si se requiere un token de autorización y lo agrega a los encabezados de la petición.
     * @param secure Indica si es necesaria la autorización.
     * @param headers Los encabezados a los que se agregará el token de autorización.
     */
    private static requireToken(secure: boolean, headers: Headers) {
      headers.append('Content-Type', 'application/json');
      headers.append('Access-Control-Allow-Origin', '*');
      
      if (secure) {
        const token = AuthUtil.getCredentials();
        if (token) {
          headers.append('Authorization', token);
        }
      } else {
        headers.delete('Authorization');
      }
    }
  }
  