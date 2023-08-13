"use client";

import { handleContext } from "@/app/hooks/handleContextHook";
import { createContext, useContext } from "react";

type mainContext = {
    mainInventory: any | undefined;
    setMainInventory: (main: any | undefined) => void
}

const mainContext = createContext<mainContext>({} as mainContext);


export function useMainContext() {
    return useContext(mainContext);
}

export function MainProvider({ children }: {children: React.ReactNode}) {
    const [mainInventory, setMainInventory] = handleContext("inventory");
    
    return(
        <mainContext.Provider value={{mainInventory, setMainInventory}}>
            {children}
        </mainContext.Provider>
    )
}