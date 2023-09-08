import { useToastContext } from "@/app/context/newToastContext";

export default function toastUtil() {
    const {toast} = useToastContext();
   
    /**
     * Mostrar mensaje realizado correctamente (verde)
     * @param title titulo del mensaje
     * @param message mensaje del mensaje xD
     */
    const showSuccess = (title: string, message: string) => {
        toast.current?.show({ severity: 'success', summary: title, detail: message, life: 3000 });
    }

    /**
     * Mostrar mensaje erroneo (rojo)
     * @param title titulo del mensaje
     * @param message mensaje del mensaje xD
     */
    const showError = (title: string, message: string) => {
        toast.current?.show({ severity: 'error', summary: title, detail: message, life: 3000 });
    }

    /**
     * Mostrar mensaje advertencia (rojo)
     * @param title titulo del mensaje
     * @param message mensaje del mensaje xD
     */
    const showWarn = (title: string, message: string) => {
        toast.current?.show({ severity: 'warn', summary: title, detail: message, life: 3000 });
    }

    /**
     * Mostrar mensaje informativo (amarillo)
     * @param title titulo del mensaje
     * @param message mensaje del mensaje xD
     */
    const showInfo = (title: string, message: string) => {
        toast.current?.show({ severity: 'info', summary: title, detail: message, life: 3000 });
    }

    return{
        showSuccess,
        showError,
        showWarn,
        showInfo,
    }
}
