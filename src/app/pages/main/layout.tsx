"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthUtil } from "@/app/utils/authUtil";
import { AuthService } from "@/app/services/authService";
import { ResErrorHandler } from "@/app/utils/resErrorHandler";
import NavBar from "@/app/components/navBar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const authService = new AuthService();


    const redirectToLogin = () => {
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

        const intervalId = setInterval(validateToken, 30000);
        return () => clearInterval(intervalId);
    }, [AuthUtil.AUTHORIZED])
    return (
        <>
            <NavBar />
            {children}
        </>
    )
}