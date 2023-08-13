"use client"

import { Toast } from "primereact/toast";
import { AuthProvider } from "../context/authContext";
import { ConfirmDialog } from "primereact/confirmdialog";
import { LoadingProvider } from "../context/loadingContext";
import { useEffect, useRef } from "react";
import { ToastUtil } from "../utils/toastUtil";

export default function PageLayout({ children }: { children: React.ReactNode }) {
    const toast = useRef<Toast>(null);

    useEffect(() => {
        ToastUtil.initializeToast(toast);
    }, [])


    return (
        <>
            <AuthProvider>
                <Toast ref={toast} />
                <ConfirmDialog />
                <LoadingProvider>
                    {children}
                </LoadingProvider>
            </AuthProvider>
        </>
    )
}