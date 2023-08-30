import { Messages } from "@/app/constants/messageConstant";
import { confirmDialog } from "primereact/confirmdialog";

export default function useConfirmationService(){

    /**
     * Metodo que funciona para elimianar
     * @param body mensaje a mostrar en el mensaje de eliminar
     * @param acceptFn metodo a ejecutar al momento de aceptar 
     */
    const showConfirmDelete = (body: string, acceptFn: () => void) => {
        confirmDialog({
            message: body,
            header: Messages.MESSAGE_HEAER_DELETE,
            icon: 'pi pi-exclamation-triangle',
            accept: acceptFn
        });
    }


    return{
        showConfirmDelete
    }

}