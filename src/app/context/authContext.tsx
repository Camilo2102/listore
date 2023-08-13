"use client";

import { handleContext } from "@/app/hooks/handleContextHook";
import { createContext, useContext, useEffect } from "react";
import { ResErrorHandler } from "../utils/resErrorHandler";
import { StorageService } from "../services/storageService";
import { useRouter } from "next/navigation";
import { HttpFactory } from "../utils/httpFactory";
import useAuthService from "../hooks/services/useAuthService";

type context = {
    authorized: any | undefined;
    setAuthorized: (authorized: any | undefined) => void
}

const AuthContext = createContext<context>({} as context);


export function useAuthContext() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }: {children: React.ReactNode}) {
    const [authorized, setAuthorized] = handleContext("authorized");
    const {validateToken} = useAuthService();
    
    const router = useRouter();


    const redirectToLogin = () => {
        StorageService.deleteStorage();
        router.push('/pages/auth/login');
    }

    const validateTokenStatus = () => {
        validateToken().then(res => {
            if (!ResErrorHandler.isValidRes(res)) {
                redirectToLogin();
            }
        })
    }

    const validateStatus = () => {
        if (!authorized) {
            redirectToLogin();
            return false;
        }
        return true;
    }

    useEffect(() => {
        if(!validateStatus())return;
        validateTokenStatus();
        const intervalId = setInterval(validateToken, 30000);
        return () => clearInterval(intervalId);
    }, [authorized])

    
    return(
        <AuthContext.Provider value={{authorized, setAuthorized}}>
            {children}
        </AuthContext.Provider>
    )
}