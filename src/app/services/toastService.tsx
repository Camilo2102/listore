import { Toast } from "primereact/toast";
import { RefObject } from "react";

export class ToastService {
    private static toast: RefObject<Toast>;

    /**
     * 
     * @param toast Referencia del objeto toast definido en el html inicial
     */
    public static initializeToast(toast: RefObject<Toast>){
        this.toast = toast;
    }


    /**
     * Mostrar mensaje realizado correctamente (verde)
     * @param title titulo del mensaje
     * @param message mensaje del mensaje xD
     */
    public static showSuccess(title: string, message: string) {
        this.toast.current?.show({severity:'success', summary: title, detail: message, life: 3000});
    }

    /**
     * Mostrar mensaje erroneo (rojo)
     * @param title titulo del mensaje
     * @param message mensaje del mensaje xD
     */
    public static showError(title: string, message: string) {
        this.toast.current?.show({severity:'error', summary: title, detail: message, life: 3000});
    }

    /**
     * Mostrar mensaje advertencia (rojo)
     * @param title titulo del mensaje
     * @param message mensaje del mensaje xD
     */
    public static showWarn(title: string, message: string) {
        this.toast.current?.show({severity:'warn', summary: title, detail: message, life: 3000});
    }

    /**
     * Mostrar mensaje informativo (amarillo)
     * @param title titulo del mensaje
     * @param message mensaje del mensaje xD
     */
    public static showInfo(title: string, message: string) {
        this.toast.current?.show({severity:'info', summary: title, detail: message, life: 3000});
    }
}