"use client"
import { handleContext } from "@/app/hooks/handleContextHook";
import { spentContext } from "./spentContext";

export default function SpentLayout({children}: {children: React.ReactNode}){
    const [spent, setSpent] = handleContext('spent');
    return(
        <spentContext.Provider value={{spent, setSpent}}>
            { children }
        </spentContext.Provider>
    )
}