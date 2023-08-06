import { Messages } from "@/app/constants/messageConstant";
import { AuthService } from "@/app/services/authService";
import { ToastService } from "@/app/services/toastService";
import { ResErrorHandler } from "@/app/utils/resErrorHandler";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function DeleteWorker({ user, visible, setVisible }: { user: any, visible: boolean, setVisible: Dispatch<SetStateAction<any>>}) {
    const authService = new AuthService();

    const footerContent = (
        <div>
            <Button label="No" icon="pi pi-times" onClick={() => setVisible(undefined)} className="p-button-text" />
            <Button label="Yes" icon="pi pi-check" onClick={() => deleteUser()} autoFocus />
        </div>
    );

    const deleteUser = () => {
        authService.disableUser(user.id).then(res => {
            if(!ResErrorHandler.isValidRes(res)){
                return;
             }
            ToastService.showSuccess(Messages.MESSAGE_SUCCESS, Messages.MESSAGE_SUCCESS_DISABLED)
            setVisible(undefined)
        })
    }

    return (
        <Dialog header="Header" footer={footerContent} visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(undefined)}>
            <p className="m-0">
               Deseas eliminar a: {user?.name}
            </p>
        </Dialog>

    )
}