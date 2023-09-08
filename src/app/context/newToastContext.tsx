import { Toast } from "primereact/toast"
import { RefObject, createContext, useContext, useRef } from "react"


type toastContext ={
    toast: RefObject<Toast>
}

const ToastContext = createContext<toastContext>({} as toastContext);

export function useToastContext(){
    return useContext(ToastContext);
}

export default function ToastProvider({ children }: { children: React.ReactNode }){
    const toast = useRef<Toast>(null);

    return(
        <ToastContext.Provider value={{toast}} >
            <Toast ref={toast} />
            {children}
        </ToastContext.Provider>
    )
}