export class Messages {
    //Mensajes de header
    public static readonly MESSAGE_SUCCESS: string = "Realizado con éxito";
    public static readonly MESSAGE_WARN: string = "Peligro";
    public static readonly MESSAGE_INFO: string = "Ten en cuenta";
    public static readonly MESSAGE_ERROR: string = "Error";

    //Mensajes de body
    public static readonly MESSAGE_CREATE_SUCCESS: string = "Creado con exito";
    public static readonly MESSAGE_UPDATE_SUCCESS: string = "Actualizado con exito";
    public static readonly MESSAGE_DELETE_SUCCESS: string = "Eliminado con exito";

    public static readonly MESSAGE_NO_TOKEN: string = "No hay un token";

    // Mensajes de los validadores
    public static readonly MESSAGE_REQUIERED: string = "Campo requerido: ";
    public static readonly MESSAGE_MAX_LENGTH: string = "Longitud maxima: ";
    public static readonly MESSAGE_NO_MAX_LENGTH_STABLISHED: string = "No se ha definido una longitud maxima para: ";
    public static readonly MESSAGE_MIN_LENGTH: string = "Longitud minima: ";
    public static readonly MESSAGE_NO_MIN_LENGTH_STABLISHED: string = "No se ha definido una longitud minima para: ";
    public static readonly MESSAGE_DUPLICATE_REGISTER: string = "El registro esta duplicado ";
    public static readonly MESSAGE_SERVER_UNAVAIABLE: string = "El servidor esta caido sebas :)";

    public static readonly MESSAGE_PASSWORD_MISMATCH: string = "Las contraseñas no coinciden: ";
    public static readonly MESSAGE_SUCCESS_DISABLED: string = "Deshabilitado con exito";

    public static readonly MESSAGE_HEAER_DELETE: string = "Deseas eliminar?"

    public static readonly MESSAGE_BODY_DELETE: string = "Deseas eliminar el registro: "

    public static readonly NO_MODEL_MESSAGE: string = "No se ha creado un modelo"
    public static readonly NO_MODEL_MESSAGE_BODY: string = "Seras redirigido a la pagina para crear uno"
  }
