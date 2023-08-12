"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthUtil } from "@/app/utils/authUtil";
import { AuthService } from "@/app/services/authService";
import { ResErrorHandler } from "@/app/utils/resErrorHandler";
import { StorageService } from "@/app/services/storageService";
import NavBar from "@/app/components/navBar";
import { mainContext } from "./mainContext";
import { handleContext } from "@/app/hooks/handleContextHook";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const authService = new AuthService();


    const redirectToLogin = () => {
        StorageService.deleteStorage();
        router.push('/pages/auth/login');
    }

    const validateToken = () => {
        authService.validateToken().then(res => {
            if (!ResErrorHandler.isValidRes(res)) {
                redirectToLogin();
            }
        })
    }

    const validateStatus = () => {
        if (!AuthUtil.isAuthorized()) {
            redirectToLogin();
        }

    }

    useEffect(() => {
        
        validateStatus();
        validateToken();
        const intervalId = setInterval(validateToken, 30000);
        return () => clearInterval(intervalId);
    }, [AuthUtil.AUTHORIZED])

    const [mainInventory, setMainInventory] = handleContext("inventory");

    return (
        <mainContext.Provider value={{mainInventory, setMainInventory}}>
            <NavBar />
            {children}
        </mainContext.Provider>
    )
}