import { Routes } from "@/app/constants/routesConstants";
import { HttpFactory } from "@/app/utils/httpFactory";
import Paginator from "../interfaces/paginator";

/**
 * Clase encargada de generar las consultas basicas
 */
export class CRUDFactory<T> {

    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }


    /**
     * Obtiene la peticion para traer todos los elementos de un objeto T
     * @param baseUrl la url basica para hacer la peticion
     * @param secure indica si requiere token, por defecto es true
     * @returns la peticion lista que trae los objetos de un elemento T
     */
    public getAll(secure: boolean = true): Promise<T[]> {
        const petitioRoute: string = this.baseUrl + Routes.GET_ALL_ROUTE;
        return HttpFactory.httpGet(petitioRoute, secure);
    }

    /**
     * Obtiene la peticion para traer la cantidad de elementos de un objeto T
     * @param baseUrl la url basica para hacer la peticion
     * @param secure indica si requiere token, por defecto es true
     * @returns la peticion lista para obtener la cantidad de registros
     */
    public getAllCount(secure: boolean = true): Promise<T> {
        const petitioRoute: string = this.baseUrl + Routes.GET_ALL_COUNT_ROUTE;
        return HttpFactory.httpGet(petitioRoute, secure);
    }

    /**
     * Obtiene la peticion para traer todos los elementos de un objeto T, teniendo en cuenta un paginador
     * @param baseUrl la url basica para hacer la peticion
     * @param secure indica si requiere token, por defecto es true
     * @param page indica la pagina que se va a obtener
     * @param pageSize el tamaño de los elementos
     * @returns la peticion lista para traer los elemtnos T paginados
     */
    public getAllByPage(

        secure: boolean = true,
        page: number = 0,
        pageSize: number = 10
    ): Promise<T[]> {
        const petitioRoute: string =
            this.baseUrl +
            Routes.GET_ALL_BY_PAGE_ROUTE +
            `?pageNumber=${page}&pageSize=${pageSize}`;
        return HttpFactory.httpGet(petitioRoute, secure);
    }

    /**
     * Este metodo se encarga de obtener los valores que cumplan con los filtros ingresados
     * @param secure indica si requiere token, por defecto es true
     * @param page indica la pagina que se va a obtener
     * @param pageSize el tamaño de los elementos
     * @param t El objeto a filtrar
     * @returns  la lista de objetos filtrados
     */
    public getAllByFilter(secure: boolean = true, paginator: Paginator, t: any): Promise<T[]> {
        const petitioRoute: string = this.baseUrl + Routes.GET_ALL_BY_FILTER + `?pageNumber=${paginator.page}&pageSize=${paginator.rows}`;
        return HttpFactory.httpPost(petitioRoute, secure, t);
    }

    public countAllByFilter(secure: boolean = true, t: any): Promise<number> {
        const petitioRoute: string = this.baseUrl + Routes.COUNT_ALL_BY_FILTERS;
        return HttpFactory.httpPost(petitioRoute, secure, t);
    }

    /**
     * Obtiene la peticion para crear un registro de tipo T
     * @param baseUrl la url basica para hacer la peticion
     * @param secure indica si requiere token, por defecto es true
     * @param body el objeto que se va a enviar en la peticion de tipo T
     * @returns el objeto creado
     */
    public create(secure: boolean = true, body: T): Promise<T> {
        const petitioRoute: string = this.baseUrl + Routes.CREATE_ROUTE;
        return HttpFactory.httpPost(petitioRoute, secure, body);
    }

    /**
     * Obtiene la peticion para actualizar un registro de tipo T
     * @param baseUrl la url basica para hacer la peticion
     * @param secure indica si requiere token, por defecto es true
     * @param body el objeto a actualizar, importante que tenga el id, en caso contrario falla
     * @returns la peticion con el objeto actualizado
     */
    public update(secure: boolean = true, body: T): Promise<T> {
        const petitioRoute: string = this.baseUrl + Routes.UPDATE_ROUTE;
        return HttpFactory.httpPut(petitioRoute, secure, body);
    }

    /**
     * Se elimina un registro por id
     * @param baseUrl la url basica para hacer la peticion
     * @param secure indica si requiere token, por defecto es true
     * @param id el id del elemento a eliminar
     * @returns el estado de la operacion
     */
    public delete(secure: boolean = true, id: string): Promise<any> {
        const petitioRoute: string = this.baseUrl + Routes.DELETE_ROUTE + `?id=${id}`;
        return HttpFactory.httpDelete(petitioRoute, secure);
    }
}