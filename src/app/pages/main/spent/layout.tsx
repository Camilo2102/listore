"use client"
import { useHandleContext } from "@/app/hooks/useHandleContextHook";
import { spentContext } from "./spentContext";

export default function SpentLayout({children}: {children: React.ReactNode}){
    const [spent, setSpent] = useHandleContext('spent');
    return(
        <spentContext.Provider value={{spent, setSpent}}>
            { children }
        </spentContext.Provider>
    )
}