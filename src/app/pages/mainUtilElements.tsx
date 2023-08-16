import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { useEffect, useRef } from "react";
import { ToastUtil } from "../utils/toastUtil";
import LoadingComponent from "../components/loadingComponent/loadingComponent";
import { usePathname, useRouter } from "next/navigation";
import { useLoading } from "../context/loadingContext";

export default function MainUtilElements() {
    const toast = useRef<Toast>(null);

    useEffect(() => {
        ToastUtil.initializeToast(toast);
    }, [])
    
    return (
        <>
        <LoadingComponent></LoadingComponent>
        <Toast ref={toast} />
        <ConfirmDialog />
        </>
    )
}