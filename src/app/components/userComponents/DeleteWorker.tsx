import { Messages } from "@/app/constants/messageConstant";
import { useTableContext } from "@/app/context/tableContext";
import { useToastContext } from "@/app/context/toastContext";
import useAuthService from "@/app/hooks/services/useAuthService";
import ResErrorHandler from "@/app/hooks/utils/resErrorHandler";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function DeleteWorker({ user, visible, setVisible }: { user: any, visible: boolean, setVisible: Dispatch<SetStateAction<any>>}) {
    const {disableUser} = useAuthService();
    const {isValidRes} = ResErrorHandler();
    const {showSuccess} = useToastContext();
    const { setReloadData } = useTableContext(); 
    const footerContent = ( 
        <div>
            <Button label="No" icon="pi pi-times" onClick={() => setVisible(undefined)} className="p-button-text" />
            <Button label="Yes" icon="pi pi-check" onClick={() => deleteUser()} autoFocus />
        </div>
    );

    const deleteUser = () => {
        disableUser(user.id).then(res => {
            if(!isValidRes(res)){
                return;
             }
            showSuccess(Messages.MESSAGE_SUCCESS, Messages.MESSAGE_SUCCESS_DISABLED)
            setVisible(undefined)
            setReloadData(true);
        })
    }

    return (
        <Dialog header="Deshabilitar" footer={footerContent} visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(undefined)}>
            <p className="m-0">
               Deseas deshabilitar a: {user?.name}
            </p>
        </Dialog>

    )
}