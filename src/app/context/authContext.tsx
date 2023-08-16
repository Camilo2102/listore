"use client";

import { handleContext } from "@/app/hooks/handleContextHook";
import { createContext, useContext, useEffect } from "react";
import { ResErrorHandler } from "../utils/resErrorHandler";
import { StorageService } from "../services/storageService";
import { useRouter } from "next/navigation";
import { HttpFactory } from "../utils/httpFactory";
import useAuthService from "../hooks/services/useAuthService";
import { useNavigationContext } from "./navigationContext";

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
    
    return(
        <AuthContext.Provider value={{authorized, setAuthorized}}>
            {children}
        </AuthContext.Provider>
    )
}