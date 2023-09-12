"use client";

import { useHandleContext } from "@/app/hooks/useHandleContextHook";
import { createContext, useContext} from "react";

type context = {
    authorized: any | undefined;
    setAuthorized: (authorized: any | undefined) => void
}

const AuthContext = createContext<context>({} as context);


export function useAuthContext() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }: {children: React.ReactNode}) {
    const [authorized, setAuthorized] = useHandleContext("authorized");
    
    return(
        <AuthContext.Provider value={{authorized, setAuthorized}}>
            {children}
        </AuthContext.Provider>
    )
}