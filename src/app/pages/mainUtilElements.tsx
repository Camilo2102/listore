import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { useEffect, useRef } from "react";
import { ToastUtil } from "../utils/toastUtil";

export default function MainUtilElements() {
    const toast = useRef<Toast>(null);

    useEffect(() => {
        ToastUtil.initializeToast(toast);
    }, [])
    
    return (
        <>
        <Toast ref={toast} />
        <ConfirmDialog />
        </>
    )
}