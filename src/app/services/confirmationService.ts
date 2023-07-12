import { confirmDialog } from 'primereact/confirmdialog';
import { Messages } from '../constants/generalConstant';

export class ConfirmationService {

    /**
     * Metodo que funciona para elimianar
     * @param body mensaje a mostrar en el mensaje de eliminar
     * @param acceptFn metodo a ejecutar al momento de aceptar 
     */
    public static showConfirmDelete(body: string, acceptFn: () => void){
        confirmDialog({
            message: body,
            header: Messages.MESSAGE_HEAER_DELETE,
            icon: 'pi pi-exclamation-triangle',
            accept: acceptFn
        });
    }
}