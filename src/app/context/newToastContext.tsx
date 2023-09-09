import { Toast } from "primereact/toast"
import { RefObject, createContext, useContext, useRef } from "react"
import Swal from "sweetalert2";


type toastContext ={
    showSuccess: (title: string, message: string) => void;
    showError: (title: string, message: string) => void;
    showWarn: (title: string, message: string) => void;
    showInfo: (title: string, message: string) => void;
    showErrorWithButton: (title: string, message: string) => void;
}

const ToastContext = createContext<toastContext>({} as toastContext);

export function useToastContext(){
    return useContext(ToastContext);
}

export default function ToastProvider({ children }: { children: React.ReactNode }){
   
    /**
     * Mostrar mensaje realizado correctamente (verde)
     * @param title titulo del mensaje
     * @param message mensaje del mensaje xD
     */
    const showSuccess = (title: string, message: string) => {
        Swal.fire(
            {
                position: 'top-end',
                icon: 'success',
                title: title,
                text: message,
                showConfirmButton: false,
                timer: 1000
            }
        )
    }

    /**
     * Mostrar mensaje erroneo (rojo)
     * @param title titulo del mensaje
     * @param message mensaje del mensaje xD
     */
    const showError = (title: string, message: string) => {
        Swal.fire(
            {
                position: 'top-end',
                icon: 'error',
                title: title,
                text: message,
                showConfirmButton: false,
                timer: 1000
            }
        )
    }

    /**
     * Mostrar mensaje advertencia (rojo)
     * @param title titulo del mensaje
     * @param message mensaje del mensaje xD
     */
    const showWarn = (title: string, message: string) => {
        Swal.fire(
            {
                position: 'top-end',
                icon: 'warning',
                title: title,
                text: message,
                showConfirmButton: false,
                timer: 1000
            }
        )
    }

    /**
     * Mostrar mensaje informativo (amarillo)
     * @param title titulo del mensaje
     * @param message mensaje del mensaje xD
     */
    const showInfo = (title: string, message: string) => {
        Swal.fire(
            {
                position: 'top-end',
                icon: 'info',
                title: title,
                text: message,
                showConfirmButton: false,
                timer: 1000
            }
        )
    }

    const showErrorWithButton = (title: string, message: string) => {
        Swal.fire(
            {
                position: 'center',
                icon: 'error',
                title: title,
                text: message,
                showConfirmButton: true,
                confirmButtonText: "Aceptar",
            }
        )
    }


    return(
        <ToastContext.Provider value={{showError , showInfo, showSuccess, showWarn, showErrorWithButton}} >
            {children}
        </ToastContext.Provider>
    )
}